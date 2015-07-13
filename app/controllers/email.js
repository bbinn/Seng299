var utils         = require('../utils');
var nodemailer    = require('nodemailer');
var config        = require('../../config');

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


  EmailController.contactSupport = function(req, res) {
    var body = utils.safeParse(req.body.body);

    var from = body.from;
    var subject = body.subject;
    var text = body.text;

    opts = {
      to: 'seng299Admins@seng299',
      from: from,
      subject: subject,
      text: (text),
      html: ('<div>' + text + '</div>')
    };

    EmailController.sendEmail(opts, function(error){
      if(error){
        return res.status(500).send({error: error});
      }
      else
      {
        return res.status(200).send();
      }
    });
  }

  return EmailController;

})();

module.exports = EmailController;
