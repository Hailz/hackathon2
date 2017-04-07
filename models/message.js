var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
  sellerId: String,
  messagerId: String,
  message:  {
    type: String,
    required: true
  }
});

MessageSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id:         ret._id,
      sellerId:   ret.sellerId,
      messagerId: ret.messagerId,
      message:    ret.message
    };
    return returnJson;
  }
});

module.exports = mongoose.model('Message', MessageSchema);