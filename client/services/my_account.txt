void function(ng, $, Parse, app){
  app.factory('MyAccountService', [

    '$q',
    '$timeout',

    function MyAccountService(Q, timeout){

      return {

        finish: function(is_finish){
          var q = Q.defer();

          var user = Parse.User.current();
          if(user){
            user.set("finish", is_finish);

            user.save(null, {
              success: function(u){
                q.resolve(u);
              },

              error: function(error){
                q.reject(error);
              }
            });
          }else{
            console.error("Invalid user");
          }

          return q.deferred;
        },

        makePayment: function(amount){

          var d = Q.defer();

          timeout(function(){

            if(amount == 0){
              d.reject('Amount must be non-zero');
            }

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

          });

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


}(angular, jQuery, Parse, app);