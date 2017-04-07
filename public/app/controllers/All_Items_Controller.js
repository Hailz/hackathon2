angular
.module('App')
.controller('AllItemsCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'ItemFactory',
  function($scope, $state, $stateParams, ItemFactory) {
    $scope.userName;
    $scope.items;
    
    ItemFactory.getAllItems()
    .then(
      function success(res) {
        $scope.items = res.data;
      },
      function error(err) {
        console.log('error in getSingleitem(): ', err);
      }
    );
  }
]);