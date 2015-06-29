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
        return callback(error, doc.cnt);
      }
    );
  }
  return IDController;
})();

module.exports = IDController;








