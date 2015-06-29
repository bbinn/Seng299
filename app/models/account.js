var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');

var UserSchema   = new Schema({

	// User information
	name:  { type: String, required: true},
	company:  { type: String, required: true },
	age:  { type: String, required: true },
	email:  { type: String, required: true },
	phone:  { type: String, required: true },
	address:  { type: String, required: true },

	// Account information
	username: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false },
	accountType:  { type: String, required: true },
	id:  { type: Number }


});


// hash the password before the user is saved & generate an ID for them.
UserSchema.pre('save', function(next) {
	var user = this;

	// hash the password only if the password has been changed or user is new
	if (!user.isModified('password')){
		return next();
	}

	//Generate an ID for the user here: TOOD: THIS
	user.id = 0; //TODO THIS!!

	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) {
			return next(err);
		}
		user.password = hash; // change the password to the hashed version
		return next();
	});

});


// method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password) {
	var user = this;
	return bcrypt.compareSync(password, user.password);
};


module.exports = mongoose.model('User', UserSchema);