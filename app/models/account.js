var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		   = require('bcrypt-nodejs');


var AccountSchema = new Schema({

	// User information
	name:  { type: String, required: true, select: true,  index: true},
	company:  { type: String, required: true, select: true },
	age:  { type: String, required: true, select: true },
	email:  { type: String, required: true, select: true, index: {unique: true} },
	phone:  { type: String, required: true, select: true },
	address:  { type: String, required: true, select: true },

	// Account information
	username: { type: String, required: true, select: true, index: { unique: true } },
	password: { type: String, required: true, select: false},
	accountType:  { type: String, required: true, select: true },
	locked: {type: Date, required: false, select: true },

	// Description
	description:  { type: String, required: false, select: true },
	avatarLink:  { type: String, required: false, select: true },
	bannerLink:  { type: String, required: false, select: true },

	// Override default id
	_id: { type: Number, required: true, index: { unique: true }, select: true },

	// Exclude defaults in our query results
	__v: {type: String, select: false}

});


// hash the password before the account is saved & generate an ID for them.
AccountSchema.pre('save', function(next) {
	var account = this;
	// hash the password only if the password has been changed or account is new
	if (!account.isModified('password')){
		return next();
	}
	bcrypt.hash(account.password, null, null, function(err, hash) {
		if (err) {
			return next(err);
		}
		account.password = hash; // change the password to the hashed version
		return next();
	});
});


// method to compare a given password with the database hash
AccountSchema.methods.comparePassword = function(password, callback) {
	var account = this;

	return bcrypt.compare(password, account.password, callback);
};


module.exports = mongoose.model('Account', AccountSchema);
