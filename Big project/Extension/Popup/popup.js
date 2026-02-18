document.addEventListener('DOMContentLoaded', function () {

    //Sets constants for all the built in buttons to simply for reuse
    const scanBtn = document.getElementById('scanBtn');
    const detailsBtn = document.getElementById('detailsBtn');
    const detailsPanel = document.getElementById('detailsPanel');
    const statusText = document.getElementById('statusText');
    const resultsList = document.getElementById('resultsList');

    //Handles the view scan detail which brings out information about what the scan found
    detailsBtn.addEventListener('click', function() {
        detailsPanel.classList.toggle('hidden');
        detailsBtn.textContent = detailsPanel.classList.contains('hidden') ? "View Scan Details" : "Hide Details";
    });

    //Manages the excution of scanning the webpage and what it would output
    scanBtn.addEventListener('click', async function() {
        scanBtn.textContent = "Scanning";
        statusText.textContent = "Checking page";
        
        try {
            //Calls a intermediate function to scape the current webpage
            const data = await inilizeScrape();
            // Check if data exists and handles if doesnt
            if (!data) {
                statusText.textContent = "Scan Failed";
                return;
            }
            //Calls a function validator which will verify if any of the scaped data contains AI injection attempts
            const result = validator(data);
            
            if (result.isSafe) {
                statusText.textContent = "Scan Complete: Nothing found";
                resultsList.innerHTML = "<li>No threats found yet.</li>";
            } else {
                statusText.textContent = "Scan Complete: AI injection techniques found";
                resultsList.innerHTML = result.report.map(msg => `<li>${msg}</li>`).join('');
            }
        } catch (error) {
            console.error(error);
            statusText.textContent = "Error: " + error.message;
        } 
        scanBtn.textContent = "Scan Now";
    });
});

//Function which calls the scaper script and returns the data
async function inilizeScrape() {
    //Finds the user current open tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Block system pages as that causes a error
    if (tab.url.startsWith("chrome://")) {
        throw new Error("Cannot scan system pages.");
    }

    // Registers the scraper function so we can call it later
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['scraper.js'] 
    });

    const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            return typeof scraper === 'function' ? scraper() : null;
        }
    });

    return results[0]?.result;
}

//This function will be replaced by a validator function that instead of manually compares words passes the text to a Ai to analyze. Which has strict parameters to not fall with the same trap
function validator(data) {
    const hidden = data.hidden || [];
    const comments = data.comments || [];
    const normalText = data.normalText || []
    // Words/phrases that are commonly used to override AI system instructions.
    const dangerPhrases = ["ignore all previous", "prompt injection", "system prompt","forget your instructions"];
    
    let findings = [];

    //Cycle through all text and  comparing them
    [...hidden, ...comments, ...normalText].forEach(text => {
        dangerPhrases.forEach(word => {
            if (text.toLowerCase().includes(word)) {
                findings.push(`Found suspicious text: "${word}"`);
            }
        });
    });

    return {
        isSafe: findings.length === 0,
        report: findings 
    };
}