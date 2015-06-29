var Account       = require('../models/account');
var bcrypt        = require('bcrypt-nodejs');
var IDController  = require('./id');

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

  Authenticate.signup = function(body, callback) {
    var name = body.name.trim();
    var company = body.company.trim();
    var age = body.age.trim();
    var email = body.email.trim();
    var phone = body.phone.trim();
    var address = body.address.trim();

    // Account info
    var username = body.username.trim();
    var password = body.password.trim();
    var accountType = body.accountType.trim();

    if(name.length == 0 ||
      company.length ==0 ||
      age.length == 0 ||
      email.length == 0 ||
      phone.length == 0 ||
      address.length == 0 ||
      username.length == 0||
      password.length == 0 ||
      accountType.length == 0
    ){
      return callback('Invalid arguments');
    }

    var account = new Account();

    // User info
    account.name = name;
    account.company = company;
    account.age = age;
    account.email = email;
    account.phone = phone;
    account.address = address;

    // Account info
    account.username = username;
    account.password = password;
    account.accountType = accountType;

    IDController.getNextID(function(error, id){
      if(error){
        return callback(error)
      }
      account.id = id;
      return account.save( callback );
    });
  }

  return Authenticate;
})();

module.exports = Authenticate;









