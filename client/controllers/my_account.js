angular.module('MollyApp')
.controller('MyAccountCtrl', [
  '$scope',
  '$meteor',
  '$window',
  '$timeout',
  '$rootScope',
  'BSModalService',

  function MyAccountCtrl(scope, meteor, window, timeout, rootScope, modal){

    console.log('My Account Controller');

    scope.transferItems = meteor.collection(TransferItems);
    scope.currentPayment = 0;
    scope.selectedUserId = null;
    scope.modalOpen = false;
    scope.setTitle("My Account");
    scope.loading = false;

    scope.previousBalance = function(value){
      Session.set('previousBalance', value);
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

    scope.leaveGame = function(){

    };

    scope.createGame = function(){
      rootScope.currentUser.currentGame = {

      };
    };

    scope.pay = function(event){

      if(scope.currentPayment <= scope.getAccountBalance()){

        scope.loading = true;

        Meteor.call('transfer', {
          from: Meteor.userId(),
          amount: +scope.currentPayment
        }, function(){
            timeout(function(){
              scope.currentPayment = 0;
              scope.selectedUserId = null;
              scope.loading = false;
            });
        });

      }else{
        window.alert('Not enought money to make payment');
      }
    };

    scope.transferTo = function(userId, amount){

      if(scope.currentPayment <= scope.getAccountBalance()){

        if(userId){

          scope.loading = true;
          Meteor.call('transfer', {
            from: Meteor.userId(),
            to: userId,
            amount: +amount
          }, function(){
            timeout(function(){
              scope.currentPayment = 0;
              scope.selectedUserId = null;
              scope.loading = false;
            });
          });
          
          scope.modalOpen = false;
        }else{
          scope.modalOpen = true;
        }

      }else{
        window.alert('Not enought money to transfer');
      }
    };

    scope.getAccountBalance = function(){

      if(scope.transferItems.length > 0){
        var balance = scope.transferItems.map(function(item){
          return +item.amount;
        }).reduce(function(sum, amount){
          return sum + amount;
        });

        scope.previousBalance(balance);

        return balance;
      }

      return 0;
    };

    scope.$watch(function(){
      return Session.get('previousBalance')
    }, function(b){

      //if(b != Session.get('previousBalance')){
        rootScope.playSound();
      //}
    });

    scope.previousBalance(scope.getAccountBalance());

  } // end MyAccountCtrl
]);