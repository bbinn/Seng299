var bodyParser = require('body-parser'); 	// get body-parser
var User       = require('../models/user');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

// super secret for creating tokens
var superSecret = config.secret;

//Extract the JSON object from a string[ified] body
safeParse = function(data) {
		var e;
		try {
		  if (!data) {
		    return {};
		  }
		  return JSON.parse(data);
		} catch (_error) {
		  e = _error;
		  return {};
		}
	}

//Ensure that the user is logged in (and has proper authentification)
ensureAuthenticated = function(req, res, next) {
	if(req.cookies != null){
		if (req.cookies[config.session.cookieName] != null) {
		  return utils.verifySessionToken(req.cookies[config.cookieName], function(err) {
		    if (err) {
		      console.error(err);
		      return res.send(401);
		    } else {
		      return next();
		    }
		  });
		}
	}
  return res.send(401);
}

//Ensure that the user is NOT logged in
ensureLoggedOut = function(req, res, next) {
	if(req.cookies == null){
		return next();
	}
	if (req.cookies[config.cookieName] == null) {
	  return next();
	} else {
	  return res.send(400, {
	    error: "You must be logged out to do this action"
	  });
	}
}



module.exports = function(app, express) {

	var router = express.Router();

	// Receive message from the client and then handle it here
	router.post('/login', ensureLoggedOut, function(req, res) {
			res.status(400).send({error: 'Denied'});
	});




	return router;
};


















