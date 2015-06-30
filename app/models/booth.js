var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

<<<<<<< HEAD
<<<<<<< HEAD

var BoothSchema = new Schema({

  timeSlot:     { type: Date, default: Date.now, required: true, select: true, index: true },
  vendorId:     { type: Number, required: true, select: true, index: true },
  boothType:    { type: String, required: true, select: true},
  boothNumber:  { type: Number, required: true, select: true},
  description:  { type: String, select: true }

});


module.exports = mongoose.model('Booth', BoothSchema);

=======
=======
>>>>>>> ngdialog has been implemented and popups for the schedule page are working
// booth schema
var BoothSchema   = new Schema({
	name: String,
	desc: String,
	id: {type: Number, required: true, index: {unique: true}}
});

module.exports = mongoose.model('Booth', BoothSchema);
<<<<<<< HEAD
>>>>>>> ngdialog has been implemented and popups for the schedule page are working
=======
>>>>>>> ngdialog has been implemented and popups for the schedule page are working
