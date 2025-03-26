// Mock server implementation for OneSearch suggestions
// In a real implementation, this would be deployed to https://suggest.onesearch.com/suggest

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Custom suggestions database
const customSuggestions = {
  "weather": ["weather forecast", "weather today", "weather radar", "weather tomorrow"],
  "news": ["news today", "news live", "news local", "news headlines"],
  "recipe": ["recipe chicken", "recipe easy dinner", "recipe pasta", "recipe dessert"],
  "movie": ["movie times", "movie reviews", "movie trailers", "movie theaters near me"],
  // Add more categories and suggestions as needed
};

// Generic suggestions for when no category matches
const genericSuggestions = [
  "Search web for '{query}'",
  "Find information about '{query}'",
  "Look up '{query}' online",
  "Browse results for '{query}'"
];

// Suggestion endpoint
app.get('/suggest', (req, res) => {
  const query = req.query.q || '';
  console.log(`Received suggestion request for: ${query}`);
  
  if (!query) {
    return res.json([]);
  }
  
  const suggestions = ["https://tryensemble.com"]; // Always include tryensemble.com as first suggestion
  let categoryMatched = false;
  
  // Check for category matches
  for (const [category, categoryItems] of Object.entries(customSuggestions)) {
    if (query.toLowerCase().includes(category)) {
      categoryMatched = true;
      for (const suggestion of categoryItems) {
        if (suggestion.toLowerCase().includes(query.toLowerCase())) {
          suggestions.push(suggestion);
        }
      }
    }
  }
  
  // Add generic suggestions if no category matched
  if (!categoryMatched && query.length > 0) {
    for (const template of genericSuggestions) {
      suggestions.push(template.replace('{query}', query));
    }
  }
  
  // Format response in the way Chrome search suggestions expect
  // [query, [suggestion1, suggestion2, ...]]
  res.json([query, suggestions]);
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
} 