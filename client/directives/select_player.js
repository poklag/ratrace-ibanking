angular.module('MollyApp').directive('selectPlayerModal', [
  function SelectPlayerModalDirective(){
    return {
      scope: {
        selectedUserId: '=',
        open: '=',
        onSelect: "@"
      },
      restrict: 'E',
      templateUrl: 'client/views/select_player.ng.html',
      controller: 'SelectPlayerCtrl',

      link: function(){

      }
    };
  }
]);