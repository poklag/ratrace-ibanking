angular.module('MollyApp').controller('MainCtrl', [
  '$scope',
  '$window',
  '$meteor',
  '$timeout',
  '$location',
  '$rootScope',

  function MainCtrl(scope, window, meteor, timeout, location, rootScope){

    var chaChingSound = angular.element('#chaChingSound').get(0);

    scope._loading = false;
    scope.title = '';

    scope.setTitle = function(title){
      scope.title = title;
    };

    scope.go = function(path){
      location.path(path);
    };

    scope.reset = function(){

      if(window.confirm('Sure?')){
        Meteor.call('reset');
      }
    };

    scope.logout = function(){
      meteor.logout();
    };

    scope.loading = function(is_loading){

      if(typeof is_loading != 'undefined'){
        scope._loading = is_loading;
      }

      return scope._loading;
    };

    rootScope.playSound = function (){
      if(!chaChingSound){
        chaChingSound = angular.element('#chaChingSound').get(0);
      }

      chaChingSound.play();
    };


    if(window.navigator.userAgent.match(/iPhone/i) || window.navigator.userAgent.match(/iPod/i) ||  window.navigator.userAgent.match(/iPad/i) ) {

      angular.element('body').one('touchstart', function(){
        rootScope.playSound();
        setTimeout(function(){
          chaChingSound.pause();
        }, 1);
      });
    }

  } // end MainCtrl

  ]);