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


    $scope.isLoggedIn = function() {
        return Auth.isLoggedIn();
    }

     // DB CALL FOR USER INFO
  UserFactory.getUser($scope.currentUserId)
    .then(
    // STORE USER INFO IN $SCOPE.VAR
    function success(res) { $scope.userInfo = res.data; },
    function error (err) { console.log('error in getting shopping cart') }
    );

    //DB CALL FOR ALL SHOPPING CART ITEMS
  ShoppingCartFactory.getAllItems()
    .then(
    function success(res) {
      // expecting an array of all items in shopping cart
      $scope.shoppingCart = res.data;
      //filter
      $scope.shoppingCart = $scope.shoppingCart.filter(function(item){
        return item.userId ==  $scope.user.Id
      })
    },
    function error(err) {
      console.log('error in getting all the shopping cart items', err)
    })

    // DB CALL FOR ALL ITEMS
  ItemFactory.getAllItems()
    .then(
    function success(res) {
      // expecting an array of all items from all users
      $scope.items = res.data;
      // filter
      $scope.cartItems = $scope.items.filter(function(item){
        return item.sellerId == $scope.shoppingCart.sellerId
      })
    },
    function error(err) {
      console.log('error in getAllItems', err)
    })

    $scope.deleteItem = function(id){
      console.log('Favorite to be deleted ID is '+ id)
      ShoppingCartFactory.deleteItem(id).then(
        function success(res){
          $state.go '/'
        },
        function error(err){
          console.log('Delete shopping cart item failed '+ err)
        })
    }
   
    
}])