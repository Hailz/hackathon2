angular
.module('App')
.controller('CreateItemCtrl', [
    '$scope', 
    '$location', 
    '$http',
    '$stateParams', 
    'AuthFactory', 
    'UserFactory', 
    'ItemFactory',
    function($scope, $location, $http, $stateParams, AuthFactory, UserFactory, ItemFactory){
    

    $scope.tempUser = AuthFactory.currentUser();
    $scope.userId = $scope.tempUser.id;
    console.log("User id " + $scope.userId)


        $scope.newItem = {
         name: '',
         photo: '',
         price: '',
         size: '',
         sellerId: $scope.userId,
         species: '',
         condition: '',
         description: '',
        }
        
    $scope.addItem = function() {
        console.log('click')
        console.log($scope.newItem)
        ItemFactory.postItem($scope.newItem)
        .then(function success(res) {
            $location.path('/')
        }, function error(err) {
            console.log("Error with create item", err)
        })
    };
}])