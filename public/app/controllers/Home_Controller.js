angular
.module('App')
.controller('HomeCtrl', [
  '$scope',
  '$state',
  'AuthFactory',
  'UserFactory',
  'ItemFactory',
  function($scope, $state, AuthFactory, UserFactory, ItemFactory) {
    
    $scope.items = [];
    
    ItemFactory.getAllItems()
    .then(
      function success(res) {
        $scope.temp = res.data;

        for (var i = 0; i < 6; i++) {
          $scope.items.push(res.data[i])
        }

      },
      function error(err) {
        console.log('error in getallitems(): ', err);
      }
    );
    
    $scope.isLoggedIn = function() {
        return Auth.isLoggedIn();
    }
  }
])