angular
.module('App')
.factory('ShoppingCart', [
  '$http',
  function($http) {
    return {
      getAllItems: function() {
        // returns an array of item objects
        // values: id, itemId, sellerId, userId
        return $http.get('/api/shoppingCart');
      },
      postItem: function(itemObj) {
        console.log('post route in shoppingcart factory, item post: ' + itemObj)
        return $http.post('/api/shoppingCart', itemObj);
      },
      deleteItem: function(id){
        console.log("deleting this item: " + id);
        return $http.delete('/api/shoppingCart/' + id);
      }
    }
  }
])