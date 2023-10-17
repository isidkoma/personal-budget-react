const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3031;
const fileSystem = require('fs');
const importJSON = fileSystem.readFileSync('budget.json', 'utf8');
const budgetData = JSON.parse(importJSON);

// Enable CORS for all routes using cors middleware
app.use(cors());




app.get('/budget', (req, res) => {
  res.json(budgetData);
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
  });

app.use('/', express.static('public'));
