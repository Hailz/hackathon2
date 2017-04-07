var mongoose = require('mongoose');

var ItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  photo:  {
    type: String,
    
    required: true
  },
  price:  {
    type: String,
    required: true
  },
  size:  {
    type: String,
    required: true
  },
  species:      String,
  condition:    String,
  description:  String,
});

ItemSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id:           ret._id,
      name:         ret.name,
      photo:        ret.photo,
      price:        ret.price,
      size:         ret.size,
      species:      ret.species,
      condition:    ret.condition,
      description:  ret.description
    };
    return returnJson;
  }
});



module.exports = mongoose.model('Item', ItemSchema);