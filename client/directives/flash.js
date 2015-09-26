// angular.module('MollyApp').directive('flash', [

//   '$timeout',

//   function FlashDirective(timeout){
//     return {
//       restrict: 'A',
//       scope: {},
//       link: function(scope, element, attrs){
//         var flashClass = attrs.flashClass;

//         timeout(function(){
//           element.removeClass('flash-' + flashClass);
//         }, 400);
//       }
//     };
//   }

// ]);