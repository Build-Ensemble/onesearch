# OneSearch

A Chrome extension that provides custom search suggestions directly in the browser's default search bar.

## How it Works

This extension overrides the default search provider settings to include custom search suggestions without requiring a specific keyword. When you type in the address bar, the extension will provide relevant suggestions based on your input.

## Installation

1. Clone this repository or download the files
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked" and select the folder containing these files
5. The extension should now be installed and active

## Features

- Custom search suggestions appear directly in the address bar
- No keyword required to trigger suggestions
- Categorized suggestions for common search terms (weather, news, recipes, movies)
- Fallback generic suggestions for other search terms

## Technical Details

The extension uses Chrome's `chrome_settings_overrides` to register as a search provider and the `search` API to handle custom suggestion logic. 