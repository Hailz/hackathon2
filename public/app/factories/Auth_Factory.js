angular
.module('App')
.factory('AuthFactory', [
  '$window',
  function($window) {
    return {
      saveToken: function(token) {
        $window.localStorage['secretToken'] = token;
      },
      removeToken: function() {
        $window.localStorage.removeItem('secretToken');
        $window.localStorage.removeItem('currentUserId');
      },
      getToken: function() {
        return $window.localStorage['secretToken'];
      },
      saveCurrentUserId: function(id) {
        $window.localStorage['currentUserId'] = id;
      },
      getCurrentUserId: function() {
        return $window.localStorage['currentUserId'];
      },
      isLoggedIn: function() {
        var token = this.getToken();
        return token ? true : false;
      },
      currentUser: function() {
        if(this.isLoggedIn()){
            var token = this.getToken();

            try {
              var payload = JSON.parse($window.atob(token.split(".")[1]));
              return payload;
            }
            catch (err){ 
              console.log('error at currentUser() in authFactory', err)
              return false;
            }
        } else {
            return false;
        }
      }
    }
  }
])