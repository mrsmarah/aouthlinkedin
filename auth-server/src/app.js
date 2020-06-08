'use strict';
const express = require('express');
const cors = require('cors');
const path = require('path');
const linkedinOuth = require('./linkedln-Middleware.js');
const app = express();
app.use(cors());
app.use(express.static('./public'));
// Routes

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.get('/oauth', linkedinOuth, (req, res) => {
  res.status(200).json({ user: req.user, token: req.token });
});

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
