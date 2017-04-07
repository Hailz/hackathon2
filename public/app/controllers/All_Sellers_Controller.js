angular
.module('App')
.controller('AllSellersCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'UserFactory',
  function($scope, $state, $stateParams, UserFactory) {
    $scope.userName;
    $scope.sellers;
    
    UserFactory.getAllUsers()
    .then(
      function success(res) {
        $scope.sellers = res.data;
      },
      function error(err) {
        console.log('error in getSingleitem(): ', err);
      }
    );
  }
]);