void function(ng, $, Parse, app){
  
  app.controller('MyAccountCtrl', [
    '$scope',
    '$timeout',
    '$rootScope',
    'MyAccountService',

    function MyAccountCtrl(scope, timeout, rootScope, myAccountService){
      rootScope.setTitle('My Account');

      var chaChingSound = Audio? new Audio('/184438_850742-lq.mp3'): null;
      var isFirstPlay = true;
      scope.myAccount = {
        balance: '',
        previousBalance: '-'
      };

      scope.currentPayment = 0;


      function playSound(){
        if(chaChingSound){
          chaChingSound.play();
        }
      };

      scope.setCurrentPayment = function(value){
        scope.currentPayment = value;
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

      scope.finish = function(){
        myAccountService.finish(true)
        .then(function(){
          alert('Yeah!');
        }).catch(function(){
          alert("Error!");
        });
      };

      scope.pay = function(){

        scope.loading(true);

        if(isFirstPlay && chaChingSound){
          isFirstPlay = false;

          chaChingSound.play();
        }

        myAccountService.makePayment(scope.currentPayment)
        .then(function(b){
          scope.currentPayment = 0;

          timeout(function(){
            scope.myAccount.balance = b;

            if(scope.myAccount.balance != scope.myAccount.previousBalance){
              playSound();
            }

            scope.myAccount.previousBalance = b;
          });

          console.log('Payment success!');
        })
        .catch(function(err){

          if(err.message){
            err = err.message;
          }

          if(err != 'Amount must be non-zero'){
            alert(err);
          }

          console.log('Payment error');
        }).finally(function(){

          scope.loading(false);

          if(!rootScope.updateAccountBalanceHandler){
            rootScope.updateAccountBalanceHandler = timeout(function(){

              rootScope.updateAccountBalanceHandler = null;
              scope.updateAccountBalance();
            }, 2500)
          }

        });
      };

      scope.updateAccountBalance = function(){

        myAccountService.getBalance().then(function(b){
          timeout(function(){
            scope.myAccount.balance = b;

            if(scope.myAccount.balance != scope.myAccount.previousBalance){
              playSound();
            }

            scope.myAccount.previousBalance = b;
          });

        }).finally(function(){

          if(!rootScope.updateAccountBalanceHandler){
            rootScope.updateAccountBalanceHandler = timeout(function(){

              rootScope.updateAccountBalanceHandler = null;
              scope.updateAccountBalance();
            }, 2500)
          }
        });
      };

      // if(scope.loginState == 'connected'){
      //   scope.updateAccountBalance();
      // }

      scope.$watch('loginState', function(loginState){
        if(scope.loginState == 'connected'){
          scope.updateAccountBalance();
        }
      });

    } // end MyAccountCtrl
  ]);

}(angular, jQuery, Parse, app);