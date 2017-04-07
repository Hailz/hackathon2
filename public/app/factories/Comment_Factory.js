angular
.module('App')
.factory('CommentFactory', [
  '$http',
  function($http) {
    return {
      getAllComments: function() {
        // returns an array of comment objects
        // values: id, sellerId, reviewerId, comment
        return $http.get('/api/comments');
      },
      postComment: function(commentObj) {
        console.log('in factory, new comment: ', commentObj);
        console.log('reviewer: ', commentObj.reviewerId);
        console.log('to: ', commentObj.sellerId);
        return $http.post('/api/comments', commentObj);
      }
    }
  }
])