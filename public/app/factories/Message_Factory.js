angular
.module('App')
.factory('MessageFactory', [
  '$http',
  function($http) {
    return {
      getAllMessage: function() {
        // returns an array of comment objects
        // values: id, sellerId, reviewerId, comment
        return $http.get('/api/messages');
      },
      postMessage: function(messageObj) {
        console.log('in factory, new message: ', messageObj);
        console.log('from: ', messageObj.messagerId);
        console.log('to: ', messageObj.sellerId);
        return $http.post('/api/messages', messageObj);
      }
    }
  }
])