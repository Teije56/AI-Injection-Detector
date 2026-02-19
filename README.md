AI Injection Detector

A Chrome Extension designed to detect prompt injection attacks and hidden instructions within web pages. 
It acts like a scanner, allowing users to scan the current page and analyze page content, invisible text, and metadata to identify malicious prompts intended to manipulate large language models. 
This is useful if you are using AI in a web browser to summarize text, as injection techniques can trick the AI into providing untrue results.

How to Run

Download or clone this repository.

Open Chrome and navigate to chrome://extensions.

Enable Developer mode (toggle in the top right).

Click Load unpacked and select the folder containing the extension files.

The entension sould appear with the other extension and if you click on it. It will open a UI with options to scan and view result of scan.

Limitations

So far, the scraped web page text is only manually compared to a set of common injection phrases, which provides a poor range of checking. 
The next step would be to pass the scraped data to an AI to analyze, with strict parameters so it does not fall into the same trap, allowing it to cast a wide net of analysis.

Why I Built This

I built this to learn more about Chrome extensions and how you could prevent AI injection attacks. 
With more people using AI in browsers to summarize web content, I wanted to explore how prompt injection attacks work and experiment with ways to detect hidden malicious instructions in web pages.

