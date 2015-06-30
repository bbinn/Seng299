var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// booth schema
var BoothSchema   = new Schema({
	name: String,
	desc: String,
	id: {type: Number, required: true, index: {unique: true}}
});

module.exports = mongoose.model('Booth', BoothSchema);
