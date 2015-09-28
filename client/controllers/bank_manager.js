void function(ng){
  
  ng.module('MollyApp').controller('BankManagerCtrl', [
    '$scope',
    '$meteor',
    '$timeout',
    '$rootScope',

    function BankManagerCtrl(scope, meteor, timeout, rootScope){

      scope.currentPayment = 0;
      scope.selectedUserId = null;
      scope.modalOpen = false;
      scope.users = meteor.collection(Meteor.users);
      scope.setTitle("Bank");
      scope.loading = false;

      scope.setSelectedUserId = function(userId){
        scope.selectedUserId = userId;
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

      scope.transferTo = function(userId, amount){

        if(userId){

          scope.loading = true;

          Meteor.call('transfer', {
            to: userId,
            amount: +amount
          }, function(){

            timeout(function(){
              scope.currentPayment = 0;
              scope.selectedUserId = null;
              scope.loading = false;
            });

            rootScope.playSound();
          });

          scope.modalOpen = false;
        }else{
          scope.modalOpen = true;
        }
      };

    }// end controller
  ]);

}(angular);