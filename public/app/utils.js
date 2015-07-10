ClientUtils = (function() {

  // Empty constructor
  function ClientUtils() {}

  // Ensure that the email is valid
  ClientUtils.validateEmail = function(email){
    var re = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]+/
    return re.test(email);
  }

  // Return object
  return ClientUtils;

})();
