var path = require("path");
var FileController = require('controllers/file');
var uploadpath = path.resolve(__dirname, '..', config.uploads);

// Set up the server routes
module.exports = function(app){

  app.get("/:id", function(req, res){
    var id = req.params.id;we
    FileController.ensureExists(id, function(exists){
      if(exists){
        var filepath = path.join(uploadpath, "#{id}");
        res.set("Content-Type", "image/jpeg");
        res.set("Content-Disposition", "attachment; filename=\"#{id}\"");
        res.set("Cache-Control", "public, max-age=1209600");
        res.set("ETag", id);
        console.info("Sending file: " + id);
        res.sendfile(filepath);
      }
      else
      {
        res.status(404).send("File not found: #{id}");
      }
    }
  });

};