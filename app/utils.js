
config = require('../config');
crypto = require('crypto');

var ServerUtils
ServerUtils = (function() {

  //Empty constructor
  function ServerUtils() {}

  // Generate a signed session token
  ServerUtils.generateSessionToken = function (accountId, expiresIn) {

    var expiry = (Math.floor(Date.now() / 1000) + config.expiryInSeconds);
    if(expiresIn != null){
      expiry = expiresIn;
    }

    // Here's the session info to sign
    var sessionInfo = (accountId +':' + expiry);

    // Create a key that's a conjunction of the private key and the data
    var key = (config.secret + '//' + accountId + '//' + expiry);

    // Sign it
    var hmac = crypto.createHmac('sha1', key);
    hmac.setEncoding('hex');
    hmac.write(sessionInfo);
    hmac.end();

    return(sessionInfo + ':' + hmac.read());
  }

  ServerUtils.verifySessionToken = function (token, callback) {
    if(token == null) {
      return callback("Invalid Token");
    }
    var fields = token.split(':');
    if(fields.length != 3) {
      return callback("Invalid Token");
    }

    var accountId = fields[0];
    var expiry = fields[1];
    var hmacSignature = fields[2];

    var accountId = parseInt(accountId);
    var expiry = parseInt(expiry);

    // Has this token expired?
    if(expiry < Math.floor(Date.now() / 1000)) {
      return callback("Token has expired");
    }

    // Does the signature match?
    if(ServerUtils.generateSessionToken(accountId, expiry) != token) {
      return callback("Token has been modified");
    }
    return callback(null, accountId, expiry);
  }


  // Cookies for authentification
  ServerUtils.setCookie = function(res, token){
    return res.cookie(config.cookieName, token,
      {
        secure: false,
        httpOnly: config.httpOnly,
        maxAge: config.expiryInSeconds * 1000
      }
    );
  }

  ServerUtils.clearCookie = function(res){
    return res.clearCookie(config.cookieName,
      {
        secure: config.secure,
        httpOnly: config.httpOnly
      }
    );
  }

  // Safely extract the data from the request
  ServerUtils.safeParse = function(data) {
    try {
      if (!data) {
        return {};
      }
      return JSON.parse(data);
    } catch (_error) {
      return {};
    }
  }

  // Do a deep clone
  ServerUtils.deepClone = function(data){
    return JSON.parse(JSON.stringify(data));
  }

  // Generate a token
  ServerUtils.generateToken = function(callback){
    var rand = function() {
      return Math.random().toString(36).substr(2); // Only take the decimal as a base 32 number
    };
    return callback( Date.now() + '_' + rand() + rand() + rand() + rand() + rand() + rand());
  }


  return ServerUtils;

})();

module.exports = ServerUtils;