var Account       = require('../models/account');
var bcrypt        = require('bcrypt-nodejs');
var IDController  = require('./id');
var utils         = require('../utils');
var config        = require('../../config');

var AuthenticateController;
AuthenticateController = (function() {

  //Empty constructor
  function AuthenticateController() {}

  // Middleware - ensure user is logged out
  AuthenticateController.ensureLoggedOut = function(req, res, next) {
    if(req.cookies == null){
      return next();
    }
    if (req.cookies[config.cookieName] == null) {
      return next();
    } else {
      return res.status(400).send({
        error: "You must be logged out to do this action"
      });
    }
  }

  // Middleware - ensure user is logged in
  AuthenticateController.ensureLoggedIn = function(req, res, next) {
    if(req.cookies != null){
      if (req.cookies[config.cookieName] != null) {
        return utils.verifySessionToken(req.cookies[config.cookieName], function(err) {
          if (err)
          {
            return res.status(401).send({
              error: err
            });
          }
          else
          {
            return next();
          }
        });
      }
    }
    return res.status(401).send();
  }


  // API Call
  AuthenticateController.login = function(req, res) {
    body = safeParse(req.body.body);
    login(body, function(err, sessionToken, accountId) {
      if(err != null) {
        clearCookie(res);
        return res.status(400).send({error: err});
      }
      else
      {
        setCookie(res, sessionToken);
        return res.status(200).send({accountId: accountId});
      }
    })
  }

  // API Call
  AuthenticateController.signup = function(req, res) {
    body = safeParse(req.body.body);
    signup(body, function(error) {
      // Handle error
      if (error) {
        if (error.code == 11000) { // duplicate entry
          return res.status(400).send({
            error: 'An account with that name already exists.'
          });
        }
        else
        {
          return res.status(400).send({
            error: error
          });
        }
      }
      //Handle success
      res.json({
        message: 'User created!'
      });
    });
  }

  // API Call
  AuthenticateController.auth = function(req, res) {
    sessionToken = req.cookies[config.cookieName];
    utils.verifySessionToken(sessionToken, function(err, accountId) {
      if(err) {
        return res.status(400).send(err);
      }

      Account.find({id: accountId }, function (err, docs) {
        if(err)
        {
          return res.status(500).send(err);
        }
        if(docs.length == 0)
        {
          return res.status(400).send("Sorry, that account doesn't exist");
        }
        account = docs[0];
        newtoken = utils.generateSessionToken(account.id);
        return res.status(200).send(account);
      });
    });
  }

  return AuthenticateController;
})();


// Commands
login = function (data, callback) {
  if(data.username == null) {
    return callback("Must provide a username");
  }
  if(data.password == null) {
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
      return callback('No user found');
    }
    account = docs[0];

    //Check if the entered password equals the hashed one.
    account.comparePassword(password, function(error, passed){
      if(error) {
        return callback(error);
      }
      if(passed != true){
        return callback('Invalid username or password');
      }
      var token = utils.generateSessionToken(account.id);
      return callback(null, token, account.id);
    });
  });
}

signup = function(body, callback) {
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

module.exports = AuthenticateController;









