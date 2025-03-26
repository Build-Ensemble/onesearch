// Background script for OneSearch extension

// Log when the service worker starts
console.log("OneSearch service worker initialized");

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