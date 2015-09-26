
angular.module('MollyApp')
  .config([
    '$routeProvider',
    '$locationProvider',

    function configureApp(routeProvider, locationProvider){

      locationProvider.html5Mode(true);
      
      routeProvider
        .when('/', {
          templateUrl: 'client/views/my_account.ng.html',
          controller: 'MyAccountCtrl'
        })
        .when('/bank', {
          templateUrl: 'client/views/bank_manager.ng.html',
          controller: 'BankManagerCtrl'
        })
        .when('/manage/cards', {
          templateUrl: 'client/views/cards/index.ng.html',
          controller: 'CardIndexCtrl'
        });

    }
  ])

  .run(function(){
    console.log('Run..');

    Meteor.subscribe("TransferItems", Meteor.userId());
    Meteor.subscribe("AvailableUsers");
    Meteor.subscribe("Cards");

    var attachFastClick = window.Origami.fastclick;
    attachFastClick(window.document.body);
  });