angular
.module('App')
.controller('AuthCtrl', [
  '$scope',
  '$http',
  '$state',
  '$window',
  'AuthFactory',
  'UserFactory',
  function($scope, $http, $state, $window, AuthFactory, UserFactory) {
    // SIGN UP STUFF
    $scope.currentUserId;
    $scope.newUser = {
      email: '',
      password: '',
      name: '',
      number: ''
    };

    $scope.userSignup = function() {
      UserFactory.userSignup($scope.newUser)
      .then(
        function success(res) {
          // Logs person in immediately after sign up
          UserFactory.userLogin($scope.newUser)
          .then(
            function success(res) {
              AuthFactory.saveToken(res.data.token);
              AuthFactory.saveCurrentUserId(res.data.user.id)
              $scope.currentUserId = $window.localStorage['currentUserId'];
              $state.go("home")
            },
            function error(err) { 
              console.log("Uh oh. Login Failed at /api/auth route in userSignup().") 
            }
          )
        }, 
        function error(err) {
          console.log("Error at /api/users route in userSignup()", err)
        }
      )
    }

    // LOG IN STUFF
    $scope.user = {
      email: '',
      password: ''
    };

    $scope.userLogin = function() {
      console.log('this is being called')
      UserFactory.userLogin($scope.user)
      .then(
        function success(res) {
          Auth.saveToken(res.data.token);
          Auth.saveCurrentUserId(res.data.user.id);
          $state.go("home")
        },
        function error(err) {
          console.log("Uh oh. Login Failed at userlogin()")
        }
      )
    }

  }
])