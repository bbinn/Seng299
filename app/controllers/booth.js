var Account       = require('../models/account');
var utils         = require('../utils');

var BoothController;
BoothController = (function() {

  //Empty constructor
  function BoothController() {}


  // API Call
  BoothController.book = function(req, res, accountInformation) {
    if(accountInformation == null) // No User
    {
      return res.status(401).send({
        error: "You must be logged in to do action"
      });
    }
    if(accountInformation.accountType != 'vendor' && accountInformation.accountType != 'admin') // User is not an admin or a vendor
    {
      return res.status(400).send({
        error: "You must be an admin or a vendor to do this action"
      });
    }
    body = utils.safeParse(req.body.body);
    // Todo: check to see if booth is already booked. If yes -> throw an error. Else: Book it.
  }

  return BoothController;
})();


module.exports = BoothController;









