var Account       = require('../models/account');
var utils         = require('../utils');
var config        = require('../../config');
var mongoose      = require('mongoose');

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

  //API Call
  // Retrieves all pending vendors
  AccountController.getPendingVendors = function(req, res, accountInformation) {
    if(accountInformation == null) {
      return res.status(401).send({
        error: "You must be logged in to do this action"
      });
    }
    if(accountInformation.accountType != 'admin') {
      return res.status(400).send({
        error: "You must be an admin to perform this action"
      });
    }
    Account.find({accountType: 'vendor_pending'})
    .exec(function (err, docs) {
      if(err) {
        return res.status(200).send(JSON.stringify({docs: []}));
      }
      return res.status(200).send(JSON.stringify({docs: docs}));
    });
  };

  AccountController.confirmVendor = function(req, res, accountInformation) {
    if(accountInformation == null) {
      return res.status(401).send({
        error: "You must be logged in to do this action"
      });
    }
    if(accountInformation.accountType != 'admin') {
      return res.status(400).send({
        error: "You must be an admin to perform this action"
      });
    }

    body = utils.safeParse(req.body.body);

    var usernames = body.usernames;
    if(usernames == null || usernames == undefined) {
      return res.status(400).send({
        error: "Missing part of the body"
      });
    }
    Account.update({username: { $in: usernames}},
      { $set: {accountType: "vendor"} },
      { multi: true },
      function(err, affected, resp) {
        if(err) {
          return res.status(500).send({});
        }
        res.status(200).send("");
      }
    );
  };

  AccountController.denyVendor = function(req, res, accountInformation) {
    if(accountInformation == null) {
      return res.status(401).send({
        error: "You must be logged in to do this action"
      });
    }
    if(accountInformation.accountType != 'admin') {
      return res.status(400).send({
        error: "You must be an admin to perform this action"
      });
    }

    body = utils.safeParse(req.body.body);

    var usernames = body.usernames;
    if(usernames == null  || usernames == undefined) {
      return res.status(400).send({
        error: "Missing part of the body"
      });
    }
    Account.update({username: { $in: usernames}},
      { $set: {accountType: "user"} },
      { multi: true },
      function(err, affected, resp) {
        if(err) {
          return res.status(500).send({});
        }
        res.status(200).send("");
      }
    );
  };

  // API call
  // Get account information from a vendor given a vendor ID
  AccountController.getAccount = function(req, res) {
      body = utils.safeParse(req.body.body);
      var query = {};
      var vendorId = body.vendorId;
      var ids = body.ids; // [1,2,4,7]
      var accountType = body.accountType;
      var fuzzyName = body.fuzzyName;

      var query = {};
      if(vendorId != null && vendorId != undefined){
        query._id = vendorId;
      }
      if(ids != null && ids != undefined){
        query._id = {$in: ids};
      }
      if(accountType != null && accountType != undefined){
        query.accountType = accountType;
      }
      if(fuzzyName != null && fuzzyName != undefined){
        query.name = { $regex: fuzzyName, $options: 'i' };
      }

      Account.find(query)
      .exec(function (err, docs) {
        if(err) {
          return res.status(200).send(JSON.stringify({docs: []}));
        }
        return res.status(200).send(JSON.stringify({docs: docs}));
      });
  };

  // API call
  // Change account information
  // Must be logged in
  AccountController.changeAccount = function(req, res, accountInformation) {

    if(accountInformation == null) {
        return res.status(401).send({
        error: "You must be logged in to perform this action"
      });
    }

    body = utils.safeParse(req.body.body);

    var vendorId = body.vendorId;
    var name = body.name;
    var company = body.company;
    var age = body.age;
    var email = body.email;
    var phone = body.phone;
    var description = body.description;

    var query= {};

    if(vendorId != null && vendorId != undefined) {
      var id = vendorId;
    }

    if(name != null && name != undefined) {
      query.name = name;
    }

    if(company != null && company != undefined) {
      query.company = company;
    }

    if(age != null && age != undefined) {
      query.age = age;
    }

    if(email != null && email != undefined) {
      query.email = email;
    }

    if(phone != null && phone != undefined) {
      query.phone = phone;
    }

    if(description != null && description != undefined) {
      query.description = description;
    }
    Account.update({_id: id},{
      $set: query
    }, function(err, doc) {
      if (err) {
        console.log(err);
        return res.status(500).send({error: err});
      }
      res.status(200).send("Success");
    });
  };

  return AccountController;
})();

module.exports = AccountController;
