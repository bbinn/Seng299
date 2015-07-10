var Account           = require('../models/account');
var ResetModel        = require('../models/reset');
var bcrypt            = require('bcrypt-nodejs');
var IDController      = require('./id');
var bcrypt            = require('bcrypt-nodejs');
var utils             = require('../utils');
var config            = require('../../config');
var EmailController   = require('./email');

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
            utils.clearCookie(res);
            return res.status(400).send({error: err});
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
    var body = utils.safeParse(req.body.body);
    login(body, function(err, sessionToken, account) {
      if(err != null) {
        utils.clearCookie(res);
        return res.status(400).send({error: err});
      }
      else
      {
        utils.setCookie(res, sessionToken);
        return res.status(200).send(account);
      }
    })
  }

  AuthenticateController.reset = function(req, res) {
    var body = utils.safeParse(req.body.body);
    var email = body.email;
    if(email == null || email == undefined)
    {
      return res.status(400).send({error: 'Email is required'});
    }
    if(!utils.validateEmail(email)){
      return res.status(400).send({error: 'A valid email is required'});
    }
    Account.find({
      email: email
    })
    .exec(function (error, docs) {
      //Find to see if this booth is already booked
      if(error) {
        return res.status(500).send({error: error});
      }
      if(docs.length == 0)
      {
        return res.status(200).send();
      }
      var account = docs[0];
      var id = account._id;

      utils.generateToken(function(token){
        ResetModel.findOneAndUpdate(
          {accountId: id},
          {$set: {token: token}},
          {upsert: true},
          function(error, doc){
            if(error)
            {
              return res.status(500).send(error);
            }
            if(doc == null)
            {
              return res.status(500).send('No file found');
            }

            // Send email here to the user with a token
            opts = {
              to: email,
              subject: 'Password Reset',
              text: ('Reset password here! ' + config.server + '/reset/' + token),
              html: ('<div>Reset Password: <a href="' + config.server + '/reset/' + token + '">Here</a></div>')
            };

            EmailController.sendEmail(opts, function(error){
              if(error){
                return res.status(500).send({error: error});
              }
              else
              {
                return res.status(200).send();
              }
            });
          }
        );
      });
    });
  }


  AuthenticateController.doreset = function(req, res) {
    var body = utils.safeParse(req.body.body);
    var token = body.token;
    var newpass = body.password;
    if(token == null || token == undefined || newpass == null || newpass == undefined)
    {
      return res.status(400).send({error: 'Missing token or password'});
    }

    // Find userId for token
    ResetModel.find({token: token }, function (err, docs) {
      if(err)
      {
        return res.status(400).send('Invalid token');
      }
      if(docs.length == 0)
      {
        return res.status(400).send('Invalid token'); // No user, so we pass it as a null
      }
      var info = docs[0];
      accountId = info.accountId;

      // Find account with userId
      Account.find({
        _id: accountId,
      })
      .exec(function (error, docs) {
        if(err)
        {
          return res.status(400).send('Invalid token');
        }
        if(docs.length == 0)
        {
          return res.status(400).send('Invalid token'); // No user, so we pass it as a null
        }
        var account = docs[0];

        // Hash the new password
        bcrypt.hash(newpass, null, null, function(err, hash) {
          if (err) {
            res.status(500).send({error: 'Generating hash'});
          }
          // Update the account password (hash it)
          Account.update({_id: accountId}, {$set: {password: hash}}, function(error, results){
            if(error){
              return res.status(500).send({error: error});
            }

            // Remove the token from the documents
            ResetModel.remove({token: token}, function() {
              return res.status(200).send();
            });
          });
        });
      });
    });
  }


  // API Call
  AuthenticateController.logout = function(req, res) {
    utils.clearCookie(res);
    return res.status(200).send();
  }

  // API Call
  AuthenticateController.signup = function(req, res) {
    body = utils.safeParse(req.body.body);
    signup(body, function(error, sessionToken, results) {
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
      utils.setCookie(res, sessionToken);
      res.status(200).send(
        JSON.stringify(results)
      );
    });
  }

  // API Call
  AuthenticateController.auth = function(req, res) {
    sessionToken = req.cookies[config.cookieName];
    utils.verifySessionToken(sessionToken, function(err, accountId) {
      if(err) {
        utils.clearCookie(res);
        return res.status(200).send({error: err});
      }

      Account.find({_id: accountId }, function (err, docs) {
        if(err)
        {
          return res.status(500).send(err);
        }
        if(docs.length == 0)
        {
          return res.status(200).send({error: "Sorry, that account doesn't exist"});
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
  Account.find({username: username }).select(
      {
        password: true //Explicity include the password in this query
      }
    ).exec(function (err, docs) {
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

        // Clone the object so we can delete the password (so it doesn't get sent to the client)
        var cloned = utils.deepClone(account);
        delete cloned.password;

        var token = utils.generateSessionToken(cloned._id);
        return callback(null, token, cloned);
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

  if(!utils.validateEmail()){
    return callback('A valid email is required!');
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
    account._id = id;
    return account.save( function(err){
      if(err)
      {
        return callback(err);
      }
      else
      {
        var token = utils.generateSessionToken(id);

        cloned = utils.deepClone(account);
        delete cloned.password;
        delete cloned.__v;

        return callback(null, token, cloned);
      }
    });

  });
}

module.exports = AuthenticateController;









