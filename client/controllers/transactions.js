 angular.module('MollyApp')
.controller('TransactionsCtrl', [

  '$scope',
  '$meteor',
  '$window',
  '$timeout',
  '$filter',
  '$rootScope',
  'BSModalService',

  function TransactionsCtrl(scope, meteor, window, timeout, filter, rootScope, modal){

    scope.transactions = scope.$meteorCollection(TransferItems);
    scope.setTitle("Transactions");
    scope.selectedTR = null;

    scope.select = function(tr){
      scope.selectedTR = tr;
    };

    scope.delete = function(tr){
      scope.transactions.remove(tr);
    };

    scope.date = function(tr){

      if(!tr){
        return "";
      }

      if(!tr._date){
        console.log('new date');
        tr._date = new Date(tr.refId);
      }

      return tr._date.getDate() + "/" + tr._date.getMonth();
    }

    scope.time = function(tr){
      if(!tr){
        return "";
      }

      if(!tr._date){
        console.log('new time');
        tr._date = new Date(tr.refId);
      }

      return filter('date')(tr._date, 'H:mm:ss');
    }
  }
]);