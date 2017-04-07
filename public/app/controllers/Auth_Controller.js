angular
.module('App')
.controller('AuthCtrl', [
  '$scope',
  '$state',
  '$window',
  'AuthFactory',
  'UserFactory',
  function($scope, $state, $window, AuthFactory, UserFactory) {
    // SIGN UP STUFF
    $scope.currentUserId;
    $scope.newUser = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      userName: '',
      photo: '',
      location: '',
      rating: 0
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
              $state.go('home')
            },
            function error(err) { 
              console.log('Uh oh. Login Failed at /api/auth route in userSignup().') 
            }
          )
        }, 
        function error(err) {
          console.log('Error at /api/users route in userSignup()', err)
        }
      )
    }

    // LOG IN STUFF
    $scope.user = {
      email: '',
      password: ''
    };

    $scope.userLogin = function() {
      UserFactory.userLogin($scope.user)
      .then(
        function success(res) {
          AuthFactory.saveToken(res.data.token);
          AuthFactory.saveCurrentUserId(res.data.user.id);
          $state.go('home')
        },
        function error(err) {
          console.log('Uh oh. Login Failed at userlogin(), ' + err.data.message)
        }
      )
    }

  }
])