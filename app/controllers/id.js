var IDModel       = require('../models/id');

var IDController;
IDController = (function() {

  //Empty constructor
  function IDController() {}

  IDController.getNextID = function(callback) {
    IDModel.findOneAndUpdate(
      {id: 'cnter'},
      {$inc: {cnt: 1}},
      {upsert: true},
      function(error, doc){
        var cnt = null;
        if(error == null && doc != null){
          cnt = doc.cnt;
        }
        return callback(error, cnt);
      }
    );
  }
  return IDController;
})();

module.exports = IDController;








