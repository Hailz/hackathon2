angular
.module('App')
.controller('CreateItemCtrl', [
    '$scope', 
    '$location', 
    '$http',
    '$stateParams', 
    'AuthFactory', 
    'UserFactory', 
    function($scope, $location, $http, $stateParams, AuthFactory, UserFactory){
        return

      $scope.currentUserId = $window.localStorage['currentUserId'];

        $scope.newItem = {
         name: '',
         photo: '',
         price: '',
         size: '',
         sellerId: currentUserId,
         species: '',
         condition: '',
         description: '',
        }
        
    $scope.addItem = function() {
        console.log($scope.newItem)
        ItemFactory.postItem($scope.newItem)
        .then(function success(res) {
            $location.path('/')
        }, function error(err) {
            console.log("Error with create item", err)
        })
    };
}])