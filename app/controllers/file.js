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
  FileController.handleUpload = function(req, res, next){
    var file = req.files.file;
    console.log(file.name); //original name (ie: sunset.png)
    console.log(file.path); //file path (ie: /file/12345-xyaz.png)
    res.status(200).send({file: file.path});
  }

  // Ensure a file exists, will call the callback with wether it exists or not
  FileController.ensureExists = function (id, cb){
    fs.exists(path.join(uploadpath, id), cb);
  }

  return FileController;
})();


module.exports = FileController;









