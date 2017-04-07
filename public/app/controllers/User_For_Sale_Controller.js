angular
.module('App')
.controller('UserForSaleCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'AuthFactory',
  'ItemFactory',
  'UserFactory',
  function($scope, $state, $stateParams, AuthFactory, ItemFactory, UserFactory) {
  
    //add local storage to grab currentUser
    $scope.currentUserId;
    $scope.allItems= [];
    $scope.saleItems= [];

    $scope.tempUser = AuthFactory.currentUser();
    $scope.userId = $scope.tempUser.id;
    console.log("User id " + $scope.userId)

      // DB CALL FOR ITEMS SELLER CURRENT SELLING
      ItemFactory.getAllItems()
      .then(
      function success(res) {
      // expecting an array of all items from all users
        $scope.allItems = res.data;
        console.log(res.data)
        // filter through only the comment that belongs to user
        $scope.saleItems = $scope.allItems.filter(function(item) {
          return item.sellerId == $scope.userId
        })
        // show on page
          console.log('sellerItems: ', $scope.saleItems)
        },
        function error(err) {
          console.log('error in getAllItems() in itemfactory() in runAtPageRender() ', err)
        })

    $scope.isLoggedIn = function() {
      return AuthFactory.isLoggedIn();
    }
  
}])