void function(ng, $, Parse, window){


  Parse.initialize("YurQ7VJpTTs6641jPlbWdvogyYrAOhcSIzxm9xwQ", "GbCYij1leWHfIE4oaB11jhudWQ3CTbpwFncDNxhK");

  window.app = ng.module('RatRaceApp', ['ngRoute']);

  window.app.config([
    '$routeProvider',
    function configureApp(routeProvider){

      routeProvider
        .when('/', {
          templateUrl: '/views/bank_account.html',
          controller: 'MyAccountCtrl'
        })
        .when('/bank', {
          templateUrl: '/views/bank_manager.html',
          controller: 'BankManagerCtrl'
        })

    }
  ]);

  window.app.run(function(){
    console.log('Run..');
    
    var attachFastClick = window.Origami.fastclick;
    attachFastClick(window.document.body);
  });

}(angular, jQuery, Parse, window);