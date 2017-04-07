angular
.module('App')
.controller('ProfileCtrl', [
  '$scope',
  '$state',
  'AuthFactory',
  'UserFactory',
  function($scope, $state, AuthFactory, UserFactory) {
    
    //add local storage to grab currentUser
    $scope.currentUserId;
    $scope.currentUser;

    // loads db data if user is logged in
    runAtPageRender();

    function runAtPageRender() {

      $scope.currentUserId = AuthFactory.getCurrentUserId();

      if ($scope.currentUserId) {
        UserFactory.getUser($scope.currentUserId)
        .then(
          function success(res) { $scope.currentUser = res.data; },
          function error (err) { console.log('error in runAtPageRender()') }
        );
      }
    }

    $scope.isLoggedIn = function() {
      return AuthFactory.isLoggedIn();
    }

    $scope.updateProfile = function(){
      UserFactory.updateProfile($scope.currentUser)
      .then(
        function success(res){
          console.log('profile updated', res)
          $state.go('profile')
      }, 
        function error(err){
          console.log('error occured in updateprofile()', err);
      })
    }

    $scope.deleteProfile = function(id){
        console.log('deleteprofile() id', id);
        UserFactory.deleteProfile(id)
        .then(
          function success(res){
            AuthFactory.removeToken();
            $location.path('/');
          },
          function error(err){
            console.log('error in deleteProfile()', err);
          }
        )
    }


  }
])