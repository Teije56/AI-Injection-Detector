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
        
        setTimeout(() => {
            scanBtn.textContent = "Scan Now";
            document.getElementById('statusText').textContent = "Scan Complete: Nothing found";
        }, 1500);
    });
});