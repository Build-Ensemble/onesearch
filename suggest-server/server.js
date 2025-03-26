// Mock server implementation for OneSearch suggestions
// In a real implementation, this would be deployed to https://suggest.onesearch.com/suggest

const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

// Enable CORS for all routes
app.use(cors());

// Suggestion endpoint
app.get('/suggest', (req, res) => {
  const query = req.query.q || '';
  console.log(`Received suggestion request for: ${query}`);
  
  if (!query) {
    return res.json([]);
  }
  
  // Each suggestion includes a suffix annotation that indicates the search provider
  const suggestions = [
    query,                     // Default Google search (no suffix)
    query + " - ChatGPT",
    query + " - LinkedIn",
    query + " - YouTube",
    query + " - GitHub",
    query + " - Wikipedia"
  ];
  
  const descriptions = [
    "Search Google for " + query,
    "Ask ChatGPT about " + query,
    "Search LinkedIn for " + query,
    "Search YouTube for " + query,
    "Find repositories on GitHub for " + query,
    "Look up on Wikipedia: " + query
  ];
  
  // URLs that will be displayed in some browsers
  const urls = [
    "https://www.google.com/search?q=" + encodeURIComponent(query),
    "https://chat.openai.com/?q=" + encodeURIComponent(query),
    "https://www.linkedin.com/search/results/all/?keywords=" + encodeURIComponent(query),
    "https://www.youtube.com/results?search_query=" + encodeURIComponent(query),
    "https://github.com/search?q=" + encodeURIComponent(query),
    "https://en.wikipedia.org/wiki/Special:Search?search=" + encodeURIComponent(query)
  ];
  
  // Format with additional metadata
  res.setHeader('Content-Type', 'application/x-suggestions+json; charset=UTF-8');
  res.json([
    query,
    suggestions,
    descriptions,
    urls
  ]);
});

// Search endpoint for dynamic search URL redirection
app.get('/search', (req, res) => {
  const query = req.query.q || '';
  console.log(`Received search request for: ${query}`);
  
  let searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query);
  let searchQuery = query;
  
  // Parse the suffix annotations to determine which search engine to use
  if (query.endsWith(' - ChatGPT')) {
    searchQuery = query.substring(0, query.length - 10);
    searchUrl = 'https://chat.openai.com/?q=' + encodeURIComponent(searchQuery);
  } else if (query.endsWith(' - YouTube')) {
    searchQuery = query.substring(0, query.length - 10);
    searchUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(searchQuery);
  } else if (query.endsWith(' - GitHub')) {
    searchQuery = query.substring(0, query.length - 9);
    searchUrl = 'https://github.com/search?q=' + encodeURIComponent(searchQuery);
  } else if (query.endsWith(' - Wikipedia')) {
    searchQuery = query.substring(0, query.length - 12);
    searchUrl = 'https://en.wikipedia.org/wiki/Special:Search?search=' + encodeURIComponent(searchQuery);
  } else if (query.endsWith(' - LinkedIn')) {
    searchQuery = query.substring(0, query.length - 11);
    searchUrl = 'https://www.linkedin.com/search/results/all/?keywords=' + encodeURIComponent(searchQuery);
  }
  
  // Redirect to the dynamically determined search URL
  res.redirect(searchUrl);
});

// Start the server
app.listen(port, () => {
  console.log(`OneSearch suggestion server running at http://localhost:${port}`);
});

// For testing purposes
if (require.main === module) {
  console.log('To test suggestions, try:');
  console.log(`http://localhost:${port}/suggest?q=weather`);
  console.log(`http://localhost:${port}/suggest?q=news`);
  console.log(`http://localhost:${port}/suggest?q=something_else`);
  console.log('To test search redirects, try:');
  console.log(`http://localhost:${port}/search?q=weather`);
  console.log(`http://localhost:${port}/search?q=cats - YouTube`);
  console.log(`http://localhost:${port}/search?q=react - GitHub`);
} 