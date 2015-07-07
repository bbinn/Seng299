var Follower      = require('../models/follower');
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

  FollowerController.getfollowing = function(req, res) {
    body = utils.safeParse(req.body.body);
    var username = body.username;
    if(username == null) {
      return res.status(400).send({
        error: "Missing part of the body"
      });
    }
    Follower.find({vendorId: username})
    .exec(function (err, docs) {
      if(err) {
        return res.status(200).send(JSON.stringify({docs: []}));
      }
      return res.status(200).send(JSON.stringify({docs: docs}));
    });
  }

  FollowerController.getfollowers = function(req, res) {
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

  return FollowerController;
})();


module.exports = FollowerController;
