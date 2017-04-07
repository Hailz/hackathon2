var mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
  sellarId: String,
  reviewerId: String,
  comment: {
   type: String,
   required: true
  },
});

CommentSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      sellarId: ret.sellarId,
      reviewerId: ret.reviewId,
      comment: ret.comment
    };
    return returnJson;
  }
});

module.exports = mongoose.model('Comment', CommentSchema);