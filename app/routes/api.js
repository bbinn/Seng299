
var Account       = require('../models/account');
var config        = require('../../config');
var utils         = require('../utils');
var Authenticate  = require('../commands/authenticate');


// Extract the JSON object from a string[ified] body
safeParse = function(data) {
		try {
		  if (!data) {
		    return {};
		  }
		  return JSON.parse(data);
		} catch (_error) {
		  return {};
		}
	}

// Ensure that the user is logged in (and has proper authentification)
ensureAuthenticated = function(req, res, next) {
	if(req.cookies != null){
		if (req.cookies[config.cookieName] != null) {
		  return utils.verifySessionToken(req.cookies[config.cookieName], function(err) {
		    if (err)
		    {
		      return res.status(401).send({
		      	error: err
		      });
		    }
		    else
		    {
		      return next();
		    }
		  });
		}
	}
  return res.status(401).send();
}

// Ensure that the user is NOT logged in
ensureLoggedOut = function(req, res, next) {
	if(req.cookies == null){
		return next();
	}
	if (req.cookies[config.cookieName] == null) {
	  return next();
	} else {
	  return res.status(400).send({
	    error: "You must be logged out to do this action"
	  });
	}
}

// Cookies for authentification
setCookie = function(res, token){
  return res.cookie(config.cookieName, token,
  	{
	    secure: false,
	    httpOnly: true,
	    maxAge: config.expiryInSeconds * 1000
	  }
	);
}

clearCookie = function(res){
  return res.clearCookie(config.cookieName,
	  {
	    secure: config.secure,
	    httpOnly: true
	 	}
 	);
}






module.exports = function(app, express) {
	var router = express.Router();

	// Authentication routes go here
	router.post('/login', ensureLoggedOut, function(req, res) {
    body = safeParse req.body.body
    Authenticate.login(body, function(err, sessionToken, accountId) {
      if(err != null) {
        clearCookie(res);
        return res.status(400).send({error: err});
      }
      else
      {
        setCookie(res, sessionToken);
        return res.status(200).send({accountId: accountId});
      }
    })
	});

	router.post('/signup', ensureLoggedOut, function(req, res) {
		body = safeParse(req.body.body);
		var account = new Account();

		// User info
		account.name = body.name;
		account.company = body.company;
		account.age = body.age;
		account.email = body.email;
		account.phone = body.phone;
		account.address = body.address;

		// Account info
		account.username = body.username;
		account.password = body.password;
		account.accountType = body.accountType;

		account.save(function(error) {
			// Handle error
			if (error) {
				if (error.code == 11000) { // duplicate entry
					return res.status(400).send({
						error: 'An account with that name already exists.'
					});
				}
				else
				{
					return res.status(400).send({
						error: error
					});
				}
			}
			//Handle success
			res.json({
				message: 'User created!'
			});
		});
	});

	// We can add more routes below here, however we should extract them into different JS files (same for above too, just getting it to work thou)
	// ...


	return router;
};

















