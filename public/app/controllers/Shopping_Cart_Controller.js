angular
.module('App')
.controller('ShoppingCartCtrl', [
  '$scope',
  '$state',
  'AuthFactory',
  'UserFactory',
  'ItemFactory',
  'ShoppingCartFactory',
  function($scope, $state, AuthFactory, UserFactory, ItemFactory, ShoppingCartFactory) {
    $scope.shoppingCart = [];
    $scope.items = [];
    $scope.cartItems = [];

    $scope.tempUser = AuthFactory.currentUser();
    $scope.userId = $scope.tempUser.id;
    console.log("User id " + $scope.userId)

    $scope.isLoggedIn = function() {
        return Auth.isLoggedIn();
    }

    //DB CALL FOR ALL SHOPPING CART ITEMS
  ShoppingCartFactory.getAllItems()
    .then(
    function success(res) {
      // expecting an array of all items in shopping cart
      $scope.shoppingCart = res.data;
      console.log('All shopping cart items', $scope.shoppingCart)
      //filter
      $scope.shoppingCart = $scope.shoppingCart.filter(function(item){
        return item.userId ==  $scope.userId
      })
      console.log('Items in specific users cart:', $scope.shoppingCart)
        // DB CALL FOR ALL ITEMS
      ItemFactory.getAllItems()
        .then(
        function success(res) {
          // expecting an array of all items from all users
          $scope.items = res.data;
          console.log("All the items... ", $scope.items)
          // filter
          $scope.cartItems = $scope.items.filter(function(item){
            return item.id == $scope.shoppingCart.itemId
          })
          console.log("Items in the users cart...", $scope.cartItems)
        },
        function error(err) {
          console.log('error in getAllItems', err)
        })

        $scope.deleteItem = function(id){
          console.log('Favorite to be deleted ID is '+ id)
          ShoppingCartFactory.deleteItem(id).then(
            function success(res){
              $state.go('/')
            },
            function error(err){
              console.log('Delete shopping cart item failed '+ err)
            })
        }
    },
    function error(err) {
      console.log('error in getting all the shopping cart items', err)
    })
 
}])