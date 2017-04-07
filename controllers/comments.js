var express = require('express');
var Comment = require('../models/comment');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    Comment.find(function(err, comments) {
      if (err) return res.status(500).send(err);
      return res.send(comments);
    });
  })
  .post(function(req, res) {
    // Make new comment && add to the database
    Comment.create(req.body, function(err, comment) {
      if (err) return res.status(500).send(err);
      return res.send(comment);
    });
  });


  module.exports = router;