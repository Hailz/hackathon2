angular
.module('App')
.controller('NavCtrl', [
  '$scope',
  '$state',
  'AuthFactory',
  'UserFactory',
  function($scope, $state, AuthFactory, UserFactory) {
    $scope.currentUserId = AuthFactory.getCurrentUserId();

    $scope.isLoggedIn = function() {
      return AuthFactory.isLoggedIn();
    }
    $scope.logout = function() {
        AuthFactory.removeToken();
        $state.go("login");
    }
  }
])