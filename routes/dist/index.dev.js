"use strict";

// routes/index.js
var express = require('express');

var router = express.Router(); // Define a route for the root path "/"

router.get('/', function (req, res) {
  res.send('Hello, this is your server.');
});
module.exports = router;