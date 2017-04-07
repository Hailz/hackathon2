angular
.module('App')
.controller('EditItemCtrl', [
  '$scope',
  '$state',
  '$location',
  '$stateParams',
  'UserFactory',
  'ItemFactory',
  function($scope, $state, $location, $stateParams, UserFactory, ItemFactory) {
    $scope.userName;
    $scope.item;
    $scope.itemId = $stateParams.id;
    console.log('item id: ', $scope.itemId)
    
    ItemFactory.getSingleItem($scope.itemId)
    .then(
      function success(res) {
        $scope.item = res.data;

        UserFactory.getUser($scope.item.sellerId)
        .then(
          function success(res) {
            $scope.userName = res.data;
          },
          function error(err) {
            console.log('error in getUser() within itemFactory()', err);
          }
        )
      },
      function error(err) {
        console.log('error in getSingleitem(): ', err);
      }
    );
    $scope.deleteItem = function(item){
      console.log("Item ID is:", item.id)
      var id = item.id
      ItemFactory.deleteItem(id).then(function success(res){
        $location.path('/');
      }, function error(err){
        console.log('Delete item error:', err)
      })
    }
    $scope.updateItem = function(){
      console.log($scope.item)
      ItemFactory.updateItem($scope.item).then(function success(res){
        $location.path('/');
      }, function error(err){
        console.log('Update Item error:', err)
      })
    }

  }
]);