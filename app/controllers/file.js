var path  = require("path");
var fs = require("fs");
var ID = require("./id");
var uploadpath = path.resolve(__dirname, '..', config.uploads);


var getFileNameExt = function(filename){
  var a = filename.split('.');
  if( a.length == 1 || ( a.length == 2  && a[0] == "") )
  {
    return('');
  }
  return(a.pop().toLowerCase());
};

var FileController;
FileController = (function() {

  //Empty constructor
  function FileController() {}

  // Handle an upload
  FileController.handleUpload = function(req, res){
    FileController.upload(req, function(error, id){
      if(error)
      {
        return res.status(400).send({
          error: error
        });
      }
      else
      {
        res.status(200).send({
          id: id
        });
      }
    });
  }

  // Actually upload the file
  FileController.upload = function(req, callback) {
    if(req.xhr){
      var name = decodeURIComponent(req.header("x-file-name"));
      var type = (req.header("x-mime-type") || "application/octet-stream");
      var ext = getFileNameExt(name);
      if(ext != 'jpg' && ext && 'png' && ext != 'jpeg')
      {
        return callback('Must upload a jpg or png image');
      }

      ID.getNextID(function(error, id){
        if(error)
        {
          return callback(error);
        }

        var idname = (id + '.' + ext);
        var file = path.join(uploadpath, idname);
        var ws = fs.createWriteStream(tmpfile);

        ws.on("error", function(err){
          return callback("Failed opening writestream.");
        });

        ws.on("close", function(err){
          return callback(null, idname);
        });

        req.on("data", function(data){
          ws.write(data);
        });

        req.on("end", function(){
          ws.end();
        });

      });
    }
    else
    {
      return callback("Attempted non-streamed upload");
    }
  }

  // Ensure a file exists, will call the callback with wether it exists or not
  FileController.ensureExists = function (id, cb){
    fs.exists(path.join(uploadpath, id), cb);
  }

  return FileController;
})();


module.exports = FileController;









