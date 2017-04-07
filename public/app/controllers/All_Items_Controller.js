angular
.module('App')
.controller('AllItemsCtrl', [
  '$scope',
  '$state',
  '$location',
  '$stateParams',
  'ItemFactory',
  'ShoppingCartFactory',
  'UserFactory',
  'AuthFactory',
  function($scope, $state, $location, $stateParams, ItemFactory, ShoppingCartFactory, UserFactory, AuthFactory) {
    $scope.userName;
    $scope.items;
    
    //add local storage to grab currentUser
    $scope.currentUserId;
    $scope.currentUser;

    // loads db data if user is logged in
    runAtPageRender();

    function runAtPageRender() {

      $scope.currentUserId = AuthFactory.getCurrentUserId();

      if ($scope.currentUserId) {
        UserFactory.getUser($scope.currentUserId)
        .then(
          function success(res) { $scope.currentUser = res.data; },
          function error (err) { console.log('error in runAtPageRender()') }
        );
      }
    }

    ItemFactory.getAllItems()
    .then(
      function success(res) {
        $scope.items = res.data;
      },
      function error(err) {
        console.log('error in getSingleitem(): ', err);
      }
    );
    $scope.addToCart = function(item){
      console.log(this.id)
      $scope.newCartItem = {
        itemId: item.id,
        sellerId: item.sellerId,
        userId: $scope.currentUserId
      }
      ShoppingCartFactory.postItem($scope.newCartItem)
      .then(function success(res){
        console.log('Added to shopping cart:', res)
        $location.path('/')
      }, function error(err){
        console.log("Failed to add to cart:", err)
      })
    }
  }
]);