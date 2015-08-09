void function(ng, $, Parse, app){

  app.directive('fbProfile', [
    '$timeout',

    function(timeout){
      return {
        template: '<img ng-src="//graph.facebook.com/{{ fbid }}/picture?width=64&height=64" class="img-round" />'
          +' <span class="small hidden-xs">{{ name }}</span>',

        scope: {
          fbid: '='
        },
        link: function(scope, element, attrs){

          scope.name = "..."

          FB.api('/' + scope.fbid, function(response) {
              if (!response || response.error) {
                console.log(response);
              } else {

                timeout(function(){
                  scope.name = response.name;
                });
              }
            }
          );
        }
      };
    }
  ]);

  app.factory('MyAccountService', [

    '$q',

    function MyAccountService(Q){

      return {

        makePayment: function(amount){

          if(amount == 0){
            return;
          }

          var d = Q.defer();

          var user = Parse.User.current();

          if(user){

            Parse.Cloud.run('makePayment', { userId: user.id, amount: amount }, {
              success: function(balance) {
                d.resolve(balance);
              },
              error: function(error) {
                d.reject(error);
              }
            });
          }else{
            d.reject("User must login first");
          }

          return d.promise;
        },

        getBalance: function(){
          var d = Q.defer();

          var user = Parse.User.current();

          if(user){

            Parse.Cloud.run('getAccountBalance', { userId: user.id }, {
              success: function(balance) {
                d.resolve(balance);
              },
              error: function(error) {
                d.reject(error);
              }
            });
          }else{
            d.reject("User must login first");
          }

          return d.promise;
        }
      };
    }
  ]);

  app.factory('BankAccountService', [

    '$q',

    function BankAccountService(q){
      return {

        getAllAccount: function(){
          var deferred = q.defer();

          Parse.Cloud.run('getAllAccount', null, {
            success: function(users){
              deferred.resolve(users);
            },

            error: function(error){
              deferred.reject(error);
            }
          });

          return deferred.promise;
        },

        payTo: function(userId, amount){
          var deferred = q.defer();

          amount = parseFloat(amount);

          if(amount != 0){

            var CurrentItem = Parse.Object.extend('CurrentItem');

            var item = new CurrentItem();
            var user = new Parse.User();
            var amount = amount;

            user.set('id', userId);

            item.set('account', user);
            item.set('amount', amount);

            item.save(null, {
              success: function(item){
                deferred.resolve(item);
              },
              error: function(err){
                deferred.reject(err);
              }
            });

          }else{
            deferred.reject("Amount should not be zero");
          }

          return deferred.promise;
        },

        reset: function(){
          var deferred = q.defer();

          Parse.Cloud.run('reset', null, {
            success: function(){
              deferred.resolve();
            },

            error: function(err){
              deferred.reject(err);
            }
          });

          return deferred.promise;
        }
      };
    }
  ]);

}(angular, jQuery, Parse, app);