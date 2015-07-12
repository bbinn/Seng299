var Follower      = require('../models/follower');
var Account      = require('../models/account');
var utils         = require('../utils');

var FollowerController;
FollowerController = (function() {

  //Empty constructor
  function FollowerController() {}

  FollowerController.follow = function(req, res, accountInformation) {
    if(accountInformation == null) {
      return res.status(401).send({
        error: "You must be logged in to do this action"
      });
    }
    body = utils.safeParse(req.body.body);

    var username = body.username;
    var vendor = body.vendor;
    if(username == null || vendor == null) {
      return res.status(400).send({
        error: "Missing part of the body"
      });
    }
    var follow = new Follower();
    follow.userId = username;
    follow.vendorId = vendor;

    return follow.save( function(err) {
      if(err) {
        return res.status(400).send({error: err});
      }
      else
      {
        return res.status(200).send({});
      }
    });
  }

  FollowerController.unfollow = function(req, res, accountInformation) {
    if(accountInformation == null) {
      return res.status(401).send({
        error: "You must be logged in to do this action"
      });
    }
    body = utils.safeParse(req.body.body);

    var username = body.username;
    var vendor = body.vendor;
    if(username == null || vendor == null) {
      return res.status(400).send({
        error: "Missing part of the body"
      });
    }

    var query = {
      userId: username,
      vendorId: vendor,
    }

    Follower.find(query)
    .exec(function(err, docs) {
      if(err || docs.length == 0) {
        return res.status(200).send();
      }
      Follower.remove(query, function() {
        return res.status(200).send();
      });
    });
  }

  FollowerController.getfollowing = function(req, res) {
    body = utils.safeParse(req.body.body);
    var username = body.username;

    if(username == null) {
      return res.status(400).send({
        error: "Missing part of the body"
      });
    }
    Follower.find({userId: username})
    .exec(function (err, docs) {
      if(err) {
        return res.status(200).send(JSON.stringify({docs: []}));
      }
      return res.status(200).send(JSON.stringify({docs: docs}));
    });
  }

  FollowerController.topfollowers = function(req, res) {
    body = utils.safeParse(req.body.body);

    Account.find({$or:[{accountType: "admin"}, {accountType: "vendor" }]})
    .exec(function (err, docs){
      if(err) {
        return res.status(200).send(JSON.stringify({docs: []}));
      }
      var vendorsids = [];
      for(var i = 0; i < docs.length; i++){
        vendorsids.push(docs[i]._id);
      };
      Follower.find({vendorId: {$in: vendorsids}})
      .exec (function (err, docs){
        if(err) {
          return res.status(200).send(JSON.stringify({docs: []}));
        }
        hash = {};
        for(var i = 0; i < docs.length; i++) {
          if(hash[docs[i].vendorId] ==  undefined){
            hash[docs[i].vendorId] = 1;
          }
          else {
            hash[docs[i].vendorId]++;
          }
        }
        var k;
        var arr = [];
        for(k in hash){
          arr.push({vendorId: k, numFollowers: hash[k]});
        }
        arr.sort(function(a, b){

          if(a.numFollowers < b.numFollowers) {
            return -1;
          }
          if(a.numFollowers > b.numFollowers) {
            return 1;
          }
          return 0;
        });

        var ids = [];
        for(var i=0; i<arr.length; ++i){
          if(i > 10){break;}
          ids.push(arr[i].vendorId);
        }

        Account.find({_id: {$in: ids}})
        .exec(function (err, docs){
          if(err) {
            return res.status(200).send(JSON.stringify({docs: []}));
          }
          var newdocs = [];
          for(var i = 0; i < docs.length; i++){
            newdocs.push(utils.deepClone(docs[i]));
            newdocs[i].numFollowers = hash[docs[i]._id];
          }
          return res.status(200).send(JSON.stringify({docs: newdocs}));
        });
      });
    });
  }

  FollowerController.getfollowers = function(req, res) {
    body = utils.safeParse(req.body.body);
    var username = body.username;
    var ids = body.ids;

    var query = {};
    if(username == null && ids == null) {
      return res.status(400).send({
        error: "Missing part of the body"
      });
    }else {
      query.vendorId = username;
    }
    if(ids != null && ids != undefined){
      query.vendorId = {$in: ids};
    }
    Follower.find(query)
    .exec(function (err, docs) {
      if(err) {
        return res.status(200).send(JSON.stringify({docs: []}));
      }
      return res.status(200).send(JSON.stringify({docs: docs}));
    });
  }

  return FollowerController;
})();


module.exports = FollowerController;
