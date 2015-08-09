void function(ng, $, Parse, app){
  
  app.controller('BankManagerCtrl', [
    '$scope',
    '$timeout',
    '$rootScope',
    'BankAccountService',
    'FacebookService',

    function BankManagerCtrl(scope, timeout, rootScope, BankAccountService, facebook){

      rootScope.setTitle('Bank Manager');

      scope.currentPayment = 0;
      scope.users = {};

      scope.selectedUser = null;

      BankAccountService.getAllAccount()
        .then(function(users){

          timeout(function(){

            for (var i = 0; i < users.length; i++) {
              var u = users[i];
              scope.users[u.id] = u;
            };

          });

        }).catch(function(err){
          console.log(err);
          alert('Error retrieving account list');
        });

      scope.setSelectedUser = function(id){
        scope.selectedUser = scope.users[id];
      };

      scope.payTo = function(user, amount){

        if(user){

          BankAccountService.payTo(user.id, amount).then(function(){

            scope.currentPayment = 0;
            scope.selectedUser = null;

          }).catch(function(error){
            console.log(err);
            alert('Unable to complete the payment. Please try again.');
          });
        }else{
          alert('Please select player to pay to');
        }
      };

      scope.reset = function(){
        if(confirm("Sure?")){
          BankAccountService.reset().then(function(){
            alert("The game has been reset!");
          })
          .catch(function(error){
            console.log(error)
            alert("Opps!")
          });
        }
      };

    }// end controller
  ]);

}(angular, jQuery, Parse, app);