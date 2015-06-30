var Booth       = require('../models/booth');
var utils         = require('../utils');

var BoothController;
BoothController = (function() {

  //Empty constructor
  function BoothController() {}


  // API Call
  // Args:
  // timeslot: Date (UTS)
  // boothNumber: (Integer, 0-Max num booths)
  // type: String (booth type)
  // description: String (optional)
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
    var time = body.timeslot;
    var boothNumber = body.boothNumber;
    var type = body.boothType;
    var description = body.description;
    if(time == null || boothNumber == null || type == null) {
      return res.status(400).send({
        error: "Missing part of the body"
      });
    }

    Booth.find({
      timeSlot: time,
      boothNumber: boothNumber
    })
    .exec(function (err, docs) {
      //Find to see if this booth is already booked
      if(err) {
        return res.status(500).send({});
      }
      if(docs.length != 0){
        return res.status(400).send({
          error: "This booth is already booked"
        });
      }

      //Book this booth - (Save it into the database)
      var booth = new Booth();
      booth.timeSlot = time;
      booth.vendorId = accountInformation._id;
      booth.boothType = type;
      booth.boothNumber = boothNumber;
      booth.description = (description || "");

      return booth.save( function(err){
        if(err) {
          return res.status(400).send({error: err});
        }
        else
        {
          return res.status(200).send({});
        }
      });

    });
  }

  return BoothController;
})();


module.exports = BoothController;









