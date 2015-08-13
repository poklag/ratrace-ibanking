void function(ng, $, Parse, app){

  app.controller('MainCtrl', [
    '$scope',
    '$timeout',
    '$rootScope',
    'FacebookService',

    function MainCtrl(scope, timeout, rootScope, facebook){

      scope.title = '';
      scope.loginState = 'unknown';
      scope.fbid = null;

      
      scope._loading = false;
      scope.loading_thing = null;

      scope.loading = function(is_loading){

        if(typeof is_loading != 'undefined'){
          scope._loading = is_loading;
        }

        return scope._loading;
      };

      rootScope.setTitle = function(title){
        scope.title = title;
      };

      Parse.FacebookUtils.init({ // this line replaces FB.init({
        appId      : '392832657583112', // Facebook App ID
        status     : false,  // check Facebook Login status
        cookie     : true,  // enable cookies to allow Parse to access the session
        xfbml      : true,  // initialize Facebook social plugins on the page
        version    : 'v2.4' // point to the latest Facebook Graph API version
      });

      facebook.checkLoginState()
        .then(function(response){
          scope.loginState = 'connected';
          scope.fbid = response.authResponse.userID;
        })
        .catch(function(reason){

          if(reason == 'new_user'){
            scope.login();
          }else{
            scope.loginState = reason;
          }
        });

      scope.logout = function(){
        facebook.logout().then(function(){
          scope.loginState = 'unknown';
        });
      };

      scope.login = function(){

        scope.loginState = 'connecting';

        Parse.FacebookUtils.logIn(null, {
          success: function(user) {

            timeout(function(){
              scope.fbid = user.get('authData').facebook.id;
              scope.loginState = 'connected';
            });

            if (!user.existed()) {
              console.log("User signed up and logged in through Facebook!");
            } else {
              console.log("User logged in through Facebook!");
            }
          },
          error: function(user, error) {

            timeout(function(){
              scope.loginState = 'error';
            });

            alert("User cancelled the Facebook login or did not fully authorize.");
          }
        });

      };// end login

    } // end MainCtrl

  ]);

}(angular, jQuery, Parse, app);