document.addEventListener('DOMContentLoaded', function () {
    const scanBtn = document.getElementById('scanBtn');
    const detailsBtn = document.getElementById('detailsBtn');
    const detailsPanel = document.getElementById('detailsPanel');

    // Toggle the details view
    detailsBtn.addEventListener('click', function() {
        if (detailsPanel.classList.contains('hidden')) {
            detailsPanel.classList.remove('hidden');
            detailsBtn.textContent = "Hide Details";
        } else {
            detailsPanel.classList.add('hidden');
            detailsBtn.textContent = "View Details";
        }
    });

    // Simple Scan visual feedback
    scanBtn.addEventListener('click', function() {
        scanBtn.textContent = "Scanning...";
        document.getElementById('statusText').textContent = "Checking page structure...";
        const data = inilizeScrape();
        const result = validator(data);
        setTimeout(() => {
            if (result.isSafe) {
                document.getElementById('statusText').textContent = "Scan Complete: Nothing found";
                document.getElementById('resultsList').textContent = "No threats found yet.";
            } else {
                document.getElementById('statusText').textContent = "Scan Complete: Issues found in previous scan";
                document.getElementById('resultsList').textContent = result.summary;
            }
            scanBtn.textContent = "Scan Now";
        }, 1500);
    });
});

//function to call the scraper file
async function inilizeScrape() {

    return new Promise(async (resolve) => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['scraper.js'] 
        }, () => {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: scraper 
            }, (results) => {
                resolve(results[0].result); 
            });
        });
    });
}

function validator(data) {


    return {
        isSafe: !hasInjection, // true if safe, false if danger
        report: summary         
    };
}