var express = require('express');
var Item = require('../models/message');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    // database call for all items
    Item.find(function(err, messages) {
      if (err) return res.status(500).send(err);
      return res.send(messages);
    });
  })
  .post(function(req, res) {
    // Make new message && add to the database
    Item.create(req.body, function(err, message) {
      if (err) return res.status(500).send(err);
      return res.send(message);
    });
  });

module.exports = router;