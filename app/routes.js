
var config        = require('../config');
var utils         = require('./utils');

// Controllers
var Account = require('./controllers/account');
var Authenticate  = require('./controllers/authenticate');
var Booth = require('./controllers/booth');
var File = require('./controllers/file');

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


  //File routes
  router.post('/upload', Authenticate.ensureLoggedIn, File.handleUpload);

  //Return
  return router;
};



