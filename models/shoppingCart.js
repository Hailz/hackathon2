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
    type: String,
    required: true
  }
});

ShoppingCartSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id:           ret._id,
      itemId:       ret.itemId, 
      sellerId:     ret.sellerId,
      userId:       ret.userId
    };
    return returnJson;
  }
});



module.exports = mongoose.model('ShoppingCart', ShoppingCartSchema);