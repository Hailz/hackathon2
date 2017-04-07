angular
.module('App')
.factory('ItemFactory', [
  '$http',
  function($http) {
    return {
      getSingleItem: function(id) {
        return $http.post('/api/items/' + id);
        // see return values  in below comment
      },
      getAllItems: function() {
        // returns an array of item objects
        // values: id, name, photo, price, size, species
        //         sellerId, condition, description
        return $http.get('/api/items');
      },
      postItem: function(itemObj) {
        console.log('post route in item factory, item post: ', itemObj)
        return $http.post('/api/items', itemObj);
      },
      updateItem: function(itemObj){
        console.log('item updated in item factory: ' + itemObj.name);
        return $http.put('/api/items/' + itemObj.id, itemObj);
      },
      deleteItem: function(itemObj){
        console.log("deleting this item: " + itemObj.name);
        return $http.delete('/api/items/' + itemObj);
      }
    }
  }
])