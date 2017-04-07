angular
.module('App')
.controller('SingleItemCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'UserFactory',
  'ItemFactory',
  function($scope, $state, $stateParams, UserFactory, ItemFactory) {
    $scope.user;
    $scope.item;
    $scope.itemId = $stateParams.id;
    console.log('item id: ', $scope.itemId)
    
    ItemFactory.getSingleItem($scope.itemId)
    .then(
      function success(res) {
        $scope.item = res.data;

        UserFactory.getUser($scope.item.sellerId)
        .then(
          function success(res) {
            $scope.user = res.data;
          },
          function error(err) {
            console.log('error in getUser() within itemFactory()', err);
          }
        )
      },
      function error(err) {
        console.log('error in getSingleitem(): ', err);
      }
    );
  }
]);