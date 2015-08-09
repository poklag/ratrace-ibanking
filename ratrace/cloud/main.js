
function getAccountBalance(userId, success, error){
  var query = new Parse.Query("CurrentItem");

  var user = new Parse.User();

  user.set('id', userId);
  query.equalTo("account", user);

  query.find({
    success: function(results) {
      var balance = 0;
      for (var i = 0; i < results.length; ++i) {
        balance += results[i].get("amount");
      }

      success(balance);
    },
    error: function() {
      error("Item lookup failed");
    }
  });
}


Parse.Cloud.define("getAllAccount", function(request, response) {

  Parse.Cloud.useMasterKey();

  var query = new Parse.Query(Parse.User);

  query.find({
    success: function(results){
  
      var users = [];
      for(var i = 0; i < results.length; i++){

        var u = results[i];

        users.push({
          id: u.id,
          fbid: u.get('authData').facebook.id
        });
      }

      response.success(users);
    },

    error: function(error){
      response.error(error);
    }
  });
});

Parse.Cloud.define("makePayment", function(request, response) {

  var CurrentItem = Parse.Object.extend("CurrentItem");
  var item = new CurrentItem();
  var user = new Parse.User();
  var amount = request.params.amount;

  user.set('id', request.params.userId);

  getAccountBalance(user.id, function(balance){

    if(balance - amount >= 0){

      item.set('account', user);
      item.set('amount', -amount);

      item.save(null, {
        success: function(item){
          response.success(balance - amount);
        },

        error: function(err){
          response.error(error);
        }
      });
    }else{
      response.error("Insufficient money to complete the payment");
    }

  }, function(error){
    response.error(error);
  });

});

Parse.Cloud.define("getAccountBalance", function(request, response) {
  getAccountBalance(request.params.userId, function(b){
    response.success(b);
  }, function(error){
    response.error(error);
  });
});

Parse.Cloud.define("reset", function(request, response) {

  var query = new Parse.Query("CurrentItem");

  query.find({
    success: function(items){

      Parse.Object.destroyAll(items, {
        success: function(){
          response.success();
        },
        error: function(error){
          response.error(error);
        }
      });
      
    },

    error: function(error){
      response.error(error);
    }
  });

});