
  //
  //
  // Generates unqiue ID's in increasing order (starting at 0, increasing to infinity)
  //
  //

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var IdSchema   = new Schema({
  id: {type: String, index: { unique: true }},
  cnt:  { type: Number, default: 1}
});



module.exports = mongoose.model('ID', IdSchema);