var Account       = require('../models/account');
var utils         = require('../utils');
var config        = require('../../config');

var AccountController;
AccountController = (function() {

  //Empty constructor
  function AccountController() {}


  // API Call
  // Extract the userID from the sessionToken (header cookies)
  // Then find the corresponding user in the database. Then issue the passed in callback with the user information
  AccountController.getAccountInformation = function(req, res, callback) {
    sessionToken = req.cookies[config.cookieName];
    utils.verifySessionToken(sessionToken, function(err, accountId) {
      if(err) {
        utils.clearCookie(res);
        return res.status(400).send(err);
      }
      Account.find({_id: accountId }, function (err, docs) {
        if(err)
        {
          return res.status(500).send(err);
        }
        if(docs.length == 0)
        {
          return callback(res, req, null); // No user, so we pass it as a null
        }
        account = docs[0];
        return callback(req, res, account); // Pass the account into the callback
      });
    });
  };

  return AccountController;
})();


module.exports = AccountController;









