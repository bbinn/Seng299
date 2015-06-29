
var config        = require('../config');
var utils         = require('./utils');

// Controllers
var Authenticate  = require('./controllers/authenticate');

module.exports = function(app, express) {
  var router = express.Router();

  // Authentication routes
  router.post('/auth', Authenticate.auth);
  router.post('/login', Authenticate.ensureLoggedOut, Authenticate.login);
  router.post('/logout', Authenticate.ensureLoggedIn, Authenticate.logout);
  router.post('/signup', Authenticate.ensureLoggedOut, Authenticate.signup);

  // Booth Routes (book booth, unbook booth, etc.) ..


  //Other routes (comment what they are)


  //Return
  return router;

};

















