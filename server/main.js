Meteor.startup(function () {
  // code to run on server at startup
});


Meteor.publish('TransferItems', function(userId){
  return TransferItems.find({
    userId: userId
  })
});

Meteor.publish('AvailableUsers', function(){
  return Meteor.users.find({}, {
    fields: {
      emails:  1,
      profile: 1,
      'services.facebook.id':   1,
      'services.facebook.name': 1
    }
  });
});

Meteor.publish('Cards', function(){
  return Cards.find({});
});

Meteor.methods({
  "cards.create": function(card){
    Cards.insert(card);
  },

  "cards.update": function(card){
    Cards.update({_id: card._id}, card);
  },

  "cards.delete": function(id){
    Cards.remove({_id: id});
  },

  reset: function(){
    TransferItems.remove({});
  },
  transfer: function(options){

    var refId = Date.now();

    if(options.from){
      TransferItems.insert({
        userId: options.from,
        amount: -options.amount,
        type: 'TX',
        refId: refId,
        note: options.note
      });
    }

    if(options.to){
      TransferItems.insert({
        userId: options.to,
        amount: options.amount,
        type: 'TR',
        refId: refId,
        note: options.note
      });
    }

    return refId;
  }
});