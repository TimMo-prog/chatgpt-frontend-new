const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// Serve static assets (the React build)
app.use('/exp/', express.static(path.join(__dirname, 'build')));

// Any other request, send to the React app
app.get('/exp/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});