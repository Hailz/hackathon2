angular
.module('App')
.controller('HomeCtrl', [
  '$scope',
  '$state',
  'AuthFactory',
  'UserFactory',
  'ItemFactory',
  function($scope, $state, AuthFactory, UserFactory, ItemFactory) {
    $scope.items;
    
    ItemFactory.getAllItems()
    .then(
      function success(res) {
        $scope.items = res.data;
      },
      function error(err) {
        console.log('error in getSingleitem(): ', err);
      }
    );
    
    $scope.isLoggedIn = function() {
        return Auth.isLoggedIn();
    }
  }
])