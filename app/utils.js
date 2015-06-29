
config = require('../config');
crypto = require('crypto');

var ServerUtils
ServerUtils = (function() {

  //Empty constructor
  function ServerUtils() {}

  // Generate a signed session token
  ServerUtils.generateSessionToken = function (accountId, expiresIn) {

    var expiry = (Math.floor(Date.now() / 1000) + config.session.expiryInSeconds)
    if(expiresIn != null){
      expiry = expiresIn;
    }

    // Here's the session info to sign
    var sessionInfo = "#{accountId}:#{expiry}";

    // Synthesize a key that's a conjunction of the private key and the data
    var key = "#{config.secret}//#{accountId}//#{expiry}";

    // Sign it
    var hmac = crypto.createHmac('sha1', key);
    hmac.setEncoding('hex');
    hmac.write(sessionInfo);
    hmac.end();

    return "#{sessionInfo}:#{hmac.read()}";
  }

  ServerUtils.verifySessionToken = function (token, callback) {
    var fields = token.split(':');
    if(fields.length != 3){
      return callback("Invalid session token");
    }

    [ accountId, expiry, hmacSignature ] = fields;

    var accountId = parseInt(accountId);
    var expiry = parseInt(expiry);

    // Has this token expired?
    if(expiry < Math.floor(Date.now() / 1000)){
      return callback("This session token has expired");
    }

    // Does the signature match?
    if(generateSessionToken(accountId, expiry) != token){
      return callback("This session token has been modified");
    }

    return callback(null, accountId, expiry);
  }

  return ServerUtils;

})();

module.exports = ServerUtils;