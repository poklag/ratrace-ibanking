void function(ng, $, Parse, app){
  
  app.directive('keypad',
    function(){

      return {

        templateUrl: '/views/_keypad.html',
        scope: {
          value: '=ngModel'
        },

        link: function(scope, element, attrs){
          scope.value = '0';

          scope.clear = function(){
            scope.value = '0';

            //scope.setCurrentPayment(value);
          };

          scope.pressNum = function(num){
            if(scope.value == '0' && num.charAt(0) == '0'){
              return;
            }

            if(scope.value == '0'){
              scope.value = num;
            }else{
              scope.value += num;
            }

            //scope.setCurrentPayment(value);

          };
        }
      };

    }
  );
  
}(angular, jQuery, Parse, app);