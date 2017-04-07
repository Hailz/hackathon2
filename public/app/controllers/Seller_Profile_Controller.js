angular
.module('App')
.controller('ProfileCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'AuthFactory',
  'CommentFactory',
  'ItemFactory',
  'MessageFactory',
  'UserFactory',
  function($scope, $state, $stateParams, AuthFactory, CommentFactory, ItemFactory, MessageFactory, UserFactory) {
    
    //add local storage to grab currentUser
    $scope.currentUserId;
    $scope.sellarId;
    $scope.sellerInfo;
    $scope.allItemsArray;
    $scope.allCommentsArray;

    // loads db data if user is logged in
    runAtPageRender();

    
    function runAtPageRender() {
      $scope.currentUserId = AuthFactory.getCurrentUserId();
      $scope.sellerId = $stateParams.id;

      if ($scope.currentUserId) {

        // DB CALL FOR SELLER INFO
        UserFactory.getUser($scope.currentUserId)
        .then(
          // STORE SELLER INFO IN $SCOPE.VAR
          function success(res) { $scope.sellerInfo = res.data; },
          function error (err) { console.log('error in runAtPageRender()') }
        );

        // DB CALL FOR ITEMS SELLER CURRENT SELLING
        ItemFactory.getAllItems()
        .then(
          function success(res) {
            // expecting an array of all items from all users
            $scope.allItemsArray = res.data;
            // filter through only the comment that belongs to user
            $scope.allItemsArray = $scope.allItemsArray.filter(function(item) {
              
            })
            // show on page
            console.log(res)
          },
          function error(err) {
            console.log('error in getAllItems() in itemfactory() in runAtPageRender() ', err)
          })

        // DB CALL FOR COMMENTS ABOUT SELLER
        CommentFactory.getAllComments()
        .then(
          function success(res) {
            $scope.allCommentsArray;

            // expecting an array of all comments from all users
            // filter through only the comment for the seller page
            // show on page
            console.log(res)
          },
          function error(err) {
            console.log('error in getAllComments() in itemfactory() in runAtPageRender() ', err)
          }
        )

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