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
    $scope.sellerId;
    $scope.sellerInfo;
    $scope.sellerItems;
    $scope.commentsBoutSeller;

    // loads db data if user is logged in
    runAtPageRender();

    
    function runAtPageRender() {
      $scope.currentUserId = $window.localStorage['currentUserId'];
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
            $scope.sellerItems = res.data;
            // filter through only the comment that belongs to user
            $scope.sellerItems = $scope.sellerItems.filter(function(item) {
              return item.sellerId == $scope.sellerId;
            })
            // show on page
            console.log('sellerItems: ', $scope.sellerItems)
          },
          function error(err) {
            console.log('error in getAllItems() in itemfactory() in runAtPageRender() ', err)
          })

        // DB CALL FOR COMMENTS ABOUT SELLER
        CommentFactory.getAllComments()
        .then(
          function success(res) {
            // expecting an array of all comments from all users
            $scope.commentsBoutSeller = res.data;
            // filter through only the comment for the seller page
            $scope.commentsBoutSeller = $scope.commentsBoutSeller.filter(function(comment) {
              return comment.sellerId == $scope.sellerId;
            })

            // show on page
            console.log('comments about seller: ', $scope.commentsBoutSeller);
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
  }
])