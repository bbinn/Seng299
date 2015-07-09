var utils         = require('../utils');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.secure,
    auth: config.email.auth
});

var EmailController;
EmailController = (function() {

  // Empty constructor
  function EmailController() {}

  // Opts
  // to: userEmail
  // subject
  // text
  // html
  EmailController.sendEmail = function(opts, callback) {

    var mailOptions = opts;
    mailOptions.from = config.from;

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return callback(error);
      }
      console.log('Message sent: ' + info.response);
      return callback();
    });

  }

  return EmailController;

})();


module.exports = EmailController;
