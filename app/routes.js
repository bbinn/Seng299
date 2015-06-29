
var config        = require('../config');
var utils         = require('./utils');

// Controllers
var Authenticate  = require('./controllers/authenticate');


// Call Authenticate.ensureLoggedOut, ensureLoggedIn to make sure that the user is logged in
// and to extract the userID from the header

module.exports = function(app, express) {
  var router = express.Router();

  // Authentication routes
  router.post('/auth', Authenticate.auth); //Authenticate the user (check their cookeis)
  router.post('/login', Authenticate.ensureLoggedOut, Authenticate.login);
  router.post('/signup', Authenticate.ensureLoggedOut, Authenticate.signup);

  //Other routes (comment what they are)


  //Return
  return router;

};

















