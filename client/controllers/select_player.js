angular.module('MollyApp').controller('SelectPlayerCtrl', [
  '$scope',
  '$rootScope',
  '$timeout',
  '$meteor',
  'BSModalService',

  function SelectPlayerCtrl(scope, rootScope, timeout, meteor, modal){

    scope.users = meteor.collection(Meteor.users);

    scope.select = function(){
      timeout(function(){
        scope.$parent.$apply(scope.onSelect);
      });
    };

    scope.setSelectedUserId = function(id){
      scope.selectedUserId = id;
    };

    scope.$watch('open', function(isOpen){
      console.log();

      if(isOpen){
        modal.show('#selectPlayerModal', function(){
          scope.open = false;
        });
      }
    });

  }
]);