angular.module('MollyApp').controller('CardIndexCtrl',[
  '$scope',
  '$window',
  '$meteor',
  'BSModalService',

  function CardIndexCtrl(scope, window, meteor, modal){

    scope.cards = meteor.collection(Cards, false);
    scope.selectedCard = null;

    scope.confirm = function(){
      return window.confirm('Sure?');
    };

    scope.editCard = function(card){
      modal.show('#card_form_modal');
      scope.selectedCard = angular.element.extend({}, card);
    };

    scope.newCard = function(){
      scope.selectedCard = {
        name: "",
        type: "",
        subtype: "",
        description: ""
      };
      modal.show('#card_form_modal');
    };

    scope.deleteCard = function(id){
      Meteor.call('cards.delete', id);
    };

    scope.saveCard = function(){
      console.log(scope.selectedCard);

      if(scope.selectedCard._id){
        Meteor.call('cards.update', {
          _id: scope.selectedCard._id,
          name: scope.selectedCard.name,
          type: scope.selectedCard.type,
          subtype: scope.selectedCard.subtype,
          description: scope.selectedCard.description
        });
      }else{
        Meteor.call('cards.create', {
          name: scope.selectedCard.name,
          type: scope.selectedCard.type,
          subtype: scope.selectedCard.subtype,
          description: scope.selectedCard.description
        });
      }
    }
  }
]);