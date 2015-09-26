void function(ng){  
  ng.module('MollyApp').factory('BSModalService', [
    '$q',
    '$window',
    '$timeout',

    function BSModalService(q, window, timeout){

      return {
        show: function(target, onclose){
          ng.element(target).modal('show').one('hide.bs.modal', function(){
            if(typeof onclose == 'function'){
              timeout(function(){
                onclose();
              });
            }
          });
        }
      };
    }
  ]);

}(angular);