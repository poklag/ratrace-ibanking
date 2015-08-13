void function(ng, $, Parse, app){
  
  app.controller('BankManagerCtrl', [
    '$scope',
    '$timeout',
    '$rootScope',
    'BankAccountService',
    'FacebookService',
    'BSModalService',

    function BankManagerCtrl(scope, timeout, rootScope,
      BankAccountService, facebook, modal){

      rootScope.setTitle('Bank Manager');

      scope.currentPayment = 0;
      scope.users = {};

      scope.selectedUser = null;
      scope.loading(true);

      if(rootScope.updateAccountBalanceHandler){
        console.log('Clear timeout');
        timeout.cancel(rootScope.updateAccountBalanceHandler);
      }

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
        }).finally(function(){
          scope.loading(false);
        });

      scope.setSelectedUser = function(id){
        scope.selectedUser = scope.users[id];
      };

      scope.backspace = function(){
        if(scope.currentPayment !== 0){
          var val = scope.currentPayment;

          val = val.toString().slice(0, -1);

          if(val == ''){
            scope.currentPayment = 0;
          }else{
            scope.currentPayment = parseInt(val);
          }
        }
      };

      scope.payTo = function(user, amount){

        scope.loading(true);

        if(user){

          BankAccountService.payTo(user.id, amount).then(function(){

            scope.currentPayment = 0;
            scope.selectedUser = null;

          }).catch(function(error){
            console.log(error);
            alert('Unable to complete the payment. Please try again.');
          }).finally(function(){
            scope.loading(false);
          });
        }else{
          scope.loading(false);
          modal.show('#selectPlayerModal');
        }
      };

      scope.reset = function(){

        scope.loading(true);

        if(confirm("Sure?")){
          BankAccountService.reset().then(function(){
            alert("The game has been reset!");
          })
          .catch(function(error){
            console.log(error)
            alert("Opps!")
          }).finally(function(){
            scope.loading(false);
          });
        }
      };

    }// end controller
  ]);

}(angular, jQuery, Parse, app);