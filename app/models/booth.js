var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BoothSchema = new Schema({

  title:        { type: String, required: true, select: true },
  timeSlot:     { type: String, default: Date.now, required: true, select: true, index: true },
  vendorId:     { type: Number, required: true, select: true, index: true },
  boothType:    { type: String, required: true, select: true },
  boothNumber:  { type: Number, required: true, select: true },
  description:  { type: String, select: true }

});

module.exports = mongoose.model('Booth', BoothSchema);
