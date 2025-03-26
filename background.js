// Background script for OneSearch extension

// Custom suggestions data
const customSuggestions = {
  "weather": ["weather forecast", "weather today", "weather radar", "weather tomorrow"],
  "news": ["news today", "news live", "news local", "news headlines"],
  "recipe": ["recipe chicken", "recipe easy dinner", "recipe pasta", "recipe dessert"],
  "movie": ["movie times", "movie reviews", "movie trailers", "movie theaters near me"]
};

// Log when the service worker starts
console.log("OneSearch service worker initialized");

// With chrome_settings_overrides.search_provider, the suggestions are handled
// automatically by Chrome when hitting the suggest_url specified in manifest.json

// Example: Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log("OneSearch extension installed");
});

// If you want to actively test if the service worker is running:
self.onmessage = (event) => {
  console.log('Received message:', event.data);
  if (event.data && event.data.type === 'ping') {
    event.source.postMessage({ type: 'pong' });
  }
}; 