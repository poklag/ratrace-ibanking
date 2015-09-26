void function(ng){
  
  ng.module('MollyApp').directive('keypad',
    function(){

      return {

        templateUrl: 'client/views/keypad.ng.html',
        scope: {
          value: '=ngModel'
        },

        link: function(scope, element, attrs){
          scope.value = '0';

          scope.clear = function(){
            scope.value = '0';
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
  
}(angular);