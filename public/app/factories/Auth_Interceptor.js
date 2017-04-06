angular
.module('App')
.factory('AuthInterceptor', [
  'AuthFactory',
  function(AuthFactory) {
    return {
      request: function(config) {
      var token = AuthFactory.getToken();
      if(token) {
        config.headers.Authorization = 'Bearer ' + token;
      }

      return config;
      }
    }
  }
])