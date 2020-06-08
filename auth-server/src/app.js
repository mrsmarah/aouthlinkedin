'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const path=require('path');
// Esoteric Resources
// const oauth = require('./github.js');
const linkedinOuth = require('./linkedln.js');
// Prepare the express app
const app = express();

// App Level MW
app.use(cors());

// Website Files
app.use(express.static('./public'));
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'../public/index.html'));
});
// Routes
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
