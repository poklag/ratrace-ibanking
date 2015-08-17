void function(ng, $, Parse, app){  
  app.factory('BSModalService', [
    '$q',
    '$window',
    '$timeout',

    function BSModalService(q, window, timeout){

      return {
        show: function(target){
          $(target).modal('show');
        }
      };
    }
  ]);

}(angular, jQuery, Parse, app);