angular
.module('App')
.controller('HomeCtrl', [
  '$scope',
  '$state',
  'AuthFactory',
  'UserFactory',
  function($scope, $state, AuthFactory, UserFactory) {

    $scope.isLoggedIn = function() {
        return Auth.isLoggedIn();
    }
  }
])