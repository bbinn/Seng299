
var config        = require('../config');
var utils         = require('./utils');

// Controllers
var Account = require('./controllers/account');
var Authenticate  = require('./controllers/authenticate');
var Booth  = require('./controllers/booth');


module.exports = function(app, express) {
  var router = express.Router();

  // Authentication routes
  router.post('/auth', Authenticate.auth);
  router.post('/login', Authenticate.ensureLoggedOut, Authenticate.login);
  router.post('/logout', Authenticate.ensureLoggedIn, Authenticate.logout);
  router.post('/signup', Authenticate.ensureLoggedOut, Authenticate.signup);

  // Booth Routes (book booth, unbook booth, etc.) ..
  router.post('/getbooths', Booth.getBooths);
  router.post('/bookbooth', Authenticate.ensureLoggedIn, function(req, res) {
    Account.getAccountInformation(req, res, Booth.book);
  });

  // Account management
  router.post('/getpending', Authenticate.ensureLoggedIn, function(req, res) {
    Account.getAccountInformation(req, res, Account.getPendingVendors);
  });
  router.post('/confirmvendor', Authenticate.ensureLoggedIn, function(req, res) {
    Account.getAccountInformation(req, res, Account.confirmVendor);
  });
  router.post('/denyvendor', Authenticate.ensureLoggedIn, function(req, res) {
    Account.getAccountInformation(req, res, Account.denyVendor);
  });

  //Return
  return router;
};



