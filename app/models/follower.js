var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var FollowerSchema = new Schema({

  vendorId: { type: Number, required: true, select: true, index: true},
  userId:   { type: Number, required: true, select: true, index: true }

});


module.exports = mongoose.model('Follower', FollowerSchema);

