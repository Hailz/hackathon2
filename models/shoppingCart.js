var mongoose = require('mongoose');

var ShoppingCartSchema = mongoose.Schema({
  itemId: {
    type: String,
    required: true
  },
  sellerId: {
    type: String,
    required: true
  },
  userId: {
    typer: String,
    required: true
  }
});

ShoppingCartSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id:           ret._id,
      itemId:         ret.itemId,
      userId:       ret.userId, 
      sellerId:     ret.sellerId
    };
    return returnJson;
  }
});



module.exports = mongoose.model('ShoppingCart', ShoppingCartSchema);