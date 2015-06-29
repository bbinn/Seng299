var Account       = require('../models/account');
var bcrypt     = require('bcrypt-nodejs');

var Authenticate;
Authenticate = (function() {

  //Empty constructor
  function Authenticate() {}


  Authenticate.login = function (data, callback) {
    if(data.username == null){
      return callback("Must provide a username");
    }
    if(data.password == null){
      return callback("Must provide a password");
    }

    var username = data.username;
    var password = data.password;

    // get the user with that id
    Account.find({username: username }, function (err, docs) {
      if(err) {
        return callback(err);
      }
      // docs is an array
      if(docs.length == 0) {
        return callback('No user found')
      }
      account = docs[0];

      //Check if the entered password equals the hashed one.
      bcrypt.compare(account.password, password), function(error, passed){
        if(error){
          return callback(error);
        }
        if(passed != true){
          return callback('Invalid username or password');
        }
        var token = utils.generateSessionToken(account.id);
        return callback(null, token, account.id)
      }

    });
    }

  Authenticate.signup = function(data, callback) {
    var account = new Account();

    // User info
    account.name = body.name;
    account.company = body.company;
    account.age = body.age;
    account.email = body.email;
    account.phone = body.phone;
    account.address = body.address;

    // Account info
    account.username = body.username;
    account.password = body.password;
    account.accountType = body.accountType;

    return account.save( callback );
  }

  return Authenticate;
})();