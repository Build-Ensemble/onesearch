// Mock server implementation for OneSearch suggestions
// In a real implementation, this would be deployed to https://suggest.onesearch.com/suggest

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Suggestion endpoint
app.get('/suggest', (req, res) => {
  const query = req.query.q || '';
  console.log(`Received suggestion request for: ${query}`);
  
  if (!query) {
    return res.json([]);
  }
  
  // Extended format with more metadata
  const suggestions = ["https://tryensemble.com", "AI assistants", "Productivity tools"];
  const descriptions = ["Visit Ensemble - AI assistant", "Latest AI assistants in 2024", "Top productivity tools"];
  
  // Format with additional metadata
  res.setHeader('Content-Type', 'application/x-suggestions+json; charset=UTF-8');
  res.json([
    query,
    suggestions,
    descriptions,
    [
    "https://tryensemble.com",
    "https://tryensemble.com",
    "https://tryensemble.com",
    ]
  ]);
});

// Search endpoint for dynamic search URL redirection
app.get('/search', (req, res) => {
  const query = req.query.q || '';
  console.log(`Received search request for: ${query}`);
  
  let searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query);
  
  // You can dynamically determine which search engine to use based on:
  // 1. Query prefixes like "yt:" for YouTube
  // 2. User preferences stored in a database
  // 3. Time of day, geography, or other contextual factors
  
  if (query.startsWith('yt:')) {
    // YouTube search
    const ytQuery = query.substring(3);
    searchUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(ytQuery);
  } else if (query.startsWith('gh:')) {
    // GitHub search
    const ghQuery = query.substring(3);
    searchUrl = 'https://github.com/search?q=' + encodeURIComponent(ghQuery);
  } else if (query.startsWith('wiki:')) {
    // Wikipedia search
    const wikiQuery = query.substring(5);
    searchUrl = 'https://en.wikipedia.org/wiki/Special:Search?search=' + encodeURIComponent(wikiQuery);
  } else if (query.startsWith('ai:') || query.startsWith('chatgpt:')) {
    // ChatGPT query
    const aiQuery = query.startsWith('ai:') ? query.substring(3) : query.substring(8);
    searchUrl = 'https://chat.openai.com/?q=' + encodeURIComponent(aiQuery);
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
  console.log(`http://localhost:${port}/search?q=yt:cats`);
  console.log(`http://localhost:${port}/search?q=gh:react`);
} 