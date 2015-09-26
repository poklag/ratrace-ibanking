void function(ng, $, Parse, app){
  app.factory('BankAccountService', [

    '$q',
    '$timeout',

    function BankAccountService(q, timeout){
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