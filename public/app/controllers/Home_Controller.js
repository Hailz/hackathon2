angular
.module('App')
.controller('HomeCtrl', [
  '$scope',
  '$state',
  'AuthFactory',
  'UserFactory',
  'ItemFactory',
  function($scope, $state, AuthFactory, UserFactory, ItemFactory) {

    $scope.isLoggedIn = function() {
        return Auth.isLoggedIn();
    }
  }
])