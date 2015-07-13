var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var FollowerSchema = new Schema({

  vendorId: { type: Number, required: true, select: true, index: true },
  userId:   { type: Number, required: true, select: true, index: true },
  __v: { select: false },
  _id: { select: false }

});


module.exports = mongoose.model('Follower', FollowerSchema);

