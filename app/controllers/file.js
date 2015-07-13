var path  = require("path");
var fs = require("fs");
var ID = require("./id");
var uploadpath = path.resolve(__dirname, '..', '..', config.uploads);

var Account       = require('../models/account');


var FileController;
FileController = (function() {

  //Empty constructor
  function FileController() {}

  // Handle an upload
  FileController.handleAvatarComplete = function(req, res, accountInformation){
    var file = req.files.file;
    Account.update({_id: accountInformation._id},
      { $set: {avatarLink: file.path} },
      { multi: true },
      function(err, affected, resp) {
        res.status(200).send({file: file.path});
      }
    );
  }

  // Handle an upload
  FileController.handleBannerComplete = function(req, res, accountInformation){
    var file = req.files.file;
    Account.update({_id: accountInformation._id},
      { $set: {bannerLink: file.path} },
      { multi: true },
      function(err, affected, resp) {
        res.status(200).send({file: file.path});
      }
    );
  }

  // Ensure a file exists, will call the callback with wether it exists or not
  FileController.ensureExists = function (id, cb){
    fs.exists(path.join(uploadpath, id), cb);
  }

  return FileController;
})();

module.exports = FileController;
