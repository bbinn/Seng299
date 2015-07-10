var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var ResetSchema = new Schema({

  // Account id & tokens
  accountId: { type: Number, required: true, select: true, index: true },
  token: { type: String, required: true, select: true, index: true },

  // Exclude defaults in our query results
  _id: { type: String, select: false },
  __v: { type: String, select: false }

});


module.exports = mongoose.model('Reset', ResetSchema);

