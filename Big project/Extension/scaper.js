function scraper() {
    // Create location to store page information
    let data = {
        generalText: document.body.innerText, // Normal text
        hidden: [], // Hidden CSS text
        comments: [] // Code comments
    };

    const allBoxes = document.querySelectorAll('*');

    allBoxes.forEach(box => {
        const style = window.getComputedStyle(box);

        // Check way that information is normally hidden
        const isInvisible = 
            style.display === 'none' ||      // Box is turned off
            style.visibility === 'hidden' || // Box is invisible
            style.fontSize === '0px' ||      // Text is too small to see
            style.opacity === '0';           // Text is see-through

        if (isInvisible) {
            const hiddenText = box.textContent.trim();
            // Look for hidden text thats not duplicated add it to data
            if (hiddenText && !data.hidden.includes(hiddenText)) {
                data.hidden.push(hiddenText);
            }
        }
    });

    // Show the code comments
    const commentFinder = document.createNodeIterator(
        document.body, 
        NodeFilter.SHOW_COMMENT
    );
    let currentComment;
    while (currentComment = commentFinder.nextNode()) {
        data.comments.push(currentComment.nodeValue.trim());
    }

    return data;
}