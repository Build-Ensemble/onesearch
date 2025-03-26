# OneSearch Installation Guide

This guide will walk you through setting up the OneSearch Chrome extension, which provides custom search suggestions directly in Chrome's address bar without requiring a keyword.

## Prerequisites

- Google Chrome browser
- Node.js and npm (for running the suggestion server)

## Setup Steps

### 1. Install the Extension

1. Clone or download this repository to your computer
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" using the toggle in the top-right corner
4. Click "Load unpacked" and select the root folder of this project
5. The extension should now be installed and visible in your extensions list

### 2. Start the Suggestion Server

The extension relies on a local server to provide search suggestions. To start it:

1. Open a terminal or command prompt
2. Navigate to the `suggest-server` directory
3. Run `npm install` to install the required dependencies
4. Run `npm start` to start the server
5. The server will run on port 3000 by default

### 3. Configure Chrome to Use the Custom Search Provider

After installation, you need to allow Chrome to use the custom search provider:

1. Open Chrome's settings by clicking the three dots in the top-right corner and selecting "Settings"
2. Navigate to "Search engine" in the left sidebar
3. Under "Search engines," look for "OneSearch" in the list
4. Click the three dots next to "OneSearch" and select "Make default"

## Testing the Extension

To test if the extension is working properly:

1. Make sure the suggestion server is running
2. Type something in Chrome's address bar (e.g., "weather", "news", "recipe")
3. You should see custom suggestions appearing in the dropdown

## Troubleshooting

- If suggestions don't appear, check that the suggestion server is running
- If Chrome doesn't let you set OneSearch as the default, try restarting Chrome
- Check the background.js console in the Chrome extension debugging page for any errors

## Notes for Production Use

For a production deployment:
1. Host the suggestion server on a public domain with HTTPS
2. Update the `suggest_url` in manifest.json to point to your public server
3. Package the extension for the Chrome Web Store 