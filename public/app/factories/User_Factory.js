angular
.module('App')
.factory('UserFactory', [
  '$http',
  function($http) {
    return {
      getAllUsers: function() {
       return $http.get('api/users/');
     },
      getUser: function(id) {
        return $http.get('api/users/' + id);
      },
      updateProfile: function(profile){
        console.log("Profile id: " + profile.id, "Profile name: " + profile.name);
        return $http.put('/api/users/' + profile.id, profile);
      },
      deleteProfile: function(profile){
        console.log("BUH BYE Profile id: " + profile)
        return $http.delete('/api/users/' + profile);
      },
      userSignup: function(userObj) {
        return $http.post('/api/users', userObj);
      },
      userLogin: function(userObj) {
        return $http.post('/api/auth', userObj);
      }
    }
  }
])