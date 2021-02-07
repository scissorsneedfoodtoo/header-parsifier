require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;

// set up CORS and static files
app.use(cors({ optionsSuccessStatus: 200 }));
app.use('/public', express.static(`${process.cwd()}/public`));

// serve landing page
app.get('/', (__, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', (req, res) => {
  const ipaddress = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'] : req.ip;
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];

  res.json({ ipaddress, language, software });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
