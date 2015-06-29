
  //
  //
  // Generates unqiue ID's in increasing order (starting at 0, increasing to infinity)
  // This overrides the default _id field.
  // This will guarantees a range & make debugging easier
  //
  //

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var IdSchema   = new Schema({
  id: {type: String, index: { unique: true }},
  cnt:  { type: Number, default: 1},

    // Exclude defaults in our query results
  _id: {type: String, select: false},
  __v: {type: String, select: false}
});



module.exports = mongoose.model('ID', IdSchema);