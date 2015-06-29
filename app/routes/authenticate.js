
//
// Authenticate a user (Express) & its middleware. Will issue calls to the controllers as needed
//

var AuthenticateController  = require('../controllers/authenticate');
var utils = require('../utils');
var Authenticate;

// Cookies for authentification
setCookie = function(res, token){
  return res.cookie(config.cookieName, token,
    {
      secure: false,
      httpOnly: true,
      maxAge: config.expiryInSeconds * 1000
    }
  );
}

clearCookie = function(res){
  return res.clearCookie(config.cookieName,
    {
      secure: config.secure,
      httpOnly: true
    }
  );
}



Authenticate = (function() {

  //Empty constructor
  function Authenticate() {}


  // Middleware - ensure user is logged out
  Authenticate.ensureLoggedOut = function(req, res, next) {
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
  Authenticate.ensureLoggedIn = function(req, res, next) {
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
  Authenticate.login = function(req, res) {
    body = safeParse(req.body.body);
    AuthenticateController.login(body, function(err, sessionToken, accountId) {
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
  Authenticate.signup = function(req, res) {
    body = safeParse(req.body.body);
    AuthenticateController.signup(body, function(error) {
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
  Authenticate.auth = function(sessionToken, cb){
    utils.verifySessionToken(sessionToken, function(err, userId){
      if(err){
        return cb(err)
      }
      DB.findById "user", userId, (err, user) =>
        return cb(err) if err
        return cb("Sorry, that account doesn't exist") unless user
        newtoken = utils.generateSessionToken(userId)
        cb(null, newtoken, user.id)
    });
  }


  return Authenticate;
})();

module.exports = Authenticate;