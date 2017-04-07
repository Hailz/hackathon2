var express = require('express');
var Item = require('../models/item');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    // database call for all items
    Item.find(function(err, items) {
      if (err) return res.status(500).send(err);
      return res.send(items);
    });
  })
  .post(function(req, res) {
    // Make new item && add to the database
    Item.create(req.body, function(err, item) {
      if (err) return res.status(500).send(err);
      return res.send(item);
    });
  });

router.get('/:id', function(req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (err) return res.status(500).send(err);
    return res.send(item);
  });
});

router.put('/:id', function(req, res){
  Item.findByIdAndUpdate(req.params.id, req.body, function(err){
    if (err) return res.status(500).send(err);
    return res.send({message: 'Updated item details!'});
  });
});
router.delete('/:id', function(req, res){
  Item.findByIdAndRemove(req.params.id, function(err){
    if (err) return res.status(500).send(err);
    return res.send({message: 'Delete Successful'});
  })
})

module.exports = router;