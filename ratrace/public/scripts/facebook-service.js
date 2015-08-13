void function(ng, $, Parse, app){

  app.factory('FacebookService', [

    '$q',
    '$window',

    function FacebookService($q, $window) {

      var FB = $window.FB;

      function onStatusChange(deferred, response){
        if (response.status === 'connected') {
          deferred.resolve(response);
        } else if (response.status === 'not_authorized') {
          deferred.reject(response.status);
        } else {
          deferred.reject("new_user");
        }
      }

      return {
        checkLoginState: function() {
          var deferred = $q.defer();

          FB.getLoginStatus(function(response) {
            onStatusChange(deferred, response);
          });

          return deferred.promise;
        },

        logout: function(){
          var deferred = $q.defer();

          FB.logout(function(response){
            deferred.resolve();
          });

          return deferred.promise;
        },

        updateUserName: function(fbid){

          var user = Parse.User.current();

          if(user){
            FB.api('/' + fbid, function(response) {
                if (!response || response.error) {
                  console.log(response);
                } else {
                  user.set('name', response.name);
                  user.save(null, {
                    success: function(user){
                      
                    },

                    error: function(error){
                      console.error(error);
                    }

                  });
                }
              }
            );
          }else{
            console.error("Failed to update user name");
          }

        },

        getMyLastName: function() {
          var deferred = $q.defer();
          FB.api('/me', {
            fields: 'last_name'
          }, function(response) {
            if (!response || response.error) {
              deferred.reject('Error occured');
            } else {
              deferred.resolve(response);
            }
          });

          return deferred.promise;
        }
      };

    }// end facebookService
  ]);

}(angular, jQuery, Parse, app);