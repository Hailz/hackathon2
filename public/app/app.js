angular
.module('App', ['ui.router'])

.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/404');

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'app/views/home.html',
        controller: 'HomeCtrl'
    })
    .state('allForSale', {
        url: '/allForSale',
        templateUrl: 'app/views/allForSale.html',
        controller: 'AllItemsCtrl'
    })
    .state('editItem', {
        url: '/editItem/:id',
        templateUrl: 'app/views/editItem.html',
        controller: 'EditItemCtrl'
    })
    .state('allSellers', {
        url: '/allSellers',
        templateUrl: 'app/views/allSellers.html',
        controller: 'AllSellersCtrl'
    })
    .state('checkout', {
        url: '/checkout',
        templateUrl: 'app/views/checkout.html'
    })
    .state('createItem', {
        url: '/createItem',
        templateUrl: 'app/views/createItem.html',
        controller: 'CreateItemCtrl'
    })
    .state('signup', {
        url: '/signup',
        templateUrl: 'app/views/userSignup.html',
        controller: 'AuthCtrl'
    })
    .state('login', {
        url: '/login',
        templateUrl: 'app/views/userLogin.html',
        controller: 'AuthCtrl'
    })
    .state('404', {
        url: '/404',
        templateUrl: 'app/views/404.html'
    })
    .state('sellerProfile', {
        url: '/sellerProfile/:id',
        templateUrl: 'app/views/sellerProfile.html',
        controller: 'SellerProfileCtrl'
    })
    .state('userForSale', {
        url: '/userForSale',
        templateUrl: 'app/views/userForSale.html',
        controller: 'UserForSaleCtrl'
    })
    .state('itemForSale', {
        url: '/item/:id',
        templateUrl: 'app/views/itemForSale.html',
        controller: 'SingleItemCtrl'
    })
    .state('profile',{
        url: '/profile',
        templateUrl: 'app/views/profile.html',
        controller: 'ProfileCtrl'
    });

    $locationProvider.html5Mode(true);

    }])
    .config(["$httpProvider", function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    }
])