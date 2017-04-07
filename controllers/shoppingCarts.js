var express = require('express');
var ShoppingCart = require('../models/shoppingCart');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    // database call for all items
    ShoppingCart.find(function(err, shoppingCart) {
      if (err) return res.status(500).send(err);
      return res.send(shoppingCart);
    });
  })
  .post(function(req, res) {
    // Save new item && add to the database
    ShoppingCart.findOne({itemId: req.body.itemId}, function(err, shoppingCart){
      if(shoppingCart) return res.status(400).send({message: 'This item is already being purchased!'});
      ShoppingCart.create(req.body, function(err, shoppingCart) {
        if (err) return res.status(500).send(err);
        return res.send(shoppingCart);
      });
    });
  });

router.delete('/:id', function(req, res){
  ShoppingCart.findByIdAndRemove(req.params.id, function(err){
    if (err) return res.status(500).send(err);
    return res.send({message: 'Delete Successful'});
  })
})

module.exports = router;