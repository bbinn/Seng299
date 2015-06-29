
function tryLogin() {
  var username = document.getElementById('username').value.trim();
  var password = document.getElementById('password').value.trim();

  sendCommand(
    'login',
    {
      username: username,
      password: password
    },
    function(err, user) {
      if(err != null){
        console.log(err); //Use popup to display error here
      }
      else
      {
        activeUser = user;
      }
    }
  );
}

function trySignup() {
  var name = document.getElementById('name').value.trim();
  var company = document.getElementById('company').value.trim();
  var age = document.getElementById('age').value.trim();
  var email = document.getElementById('email').value.trim();
  var phone = document.getElementById('phone').value.trim();
  var address = document.getElementById('address').value.trim();

  var username = document.getElementById('username').value.trim();
  var password = document.getElementById('password').value.trim();
  var confirmPassword = document.getElementById('confirmPassword').value.trim();
  var accountType = document.getElementById('accountType').value.trim();

  // Password != confirm password
  if(password != confirmPassword)
  {
    return console.log('Passwords do not match');
  }

  sendCommand(
    'signup',
    {
      name: name,
      company: company,
      age: age,
      email: email,
      phone: phone,
      address: address,

      username: username,
      password: password,
      accountType: accountType
    },
    function(err, message) {
      if(err != null) {
        //Error occured. Handle it here
        console.log(err);
      }
      else
      {
        //Success - do login here (client side, store cookie etc.)
        console.log('Success');
      }
    }
  );
}














