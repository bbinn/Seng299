
function tryLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    sendCommand(
      'login',
      {
        username: username,
        password: password
      },
      function(err, message) {
        if(err !== null){
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

function trySignup() {
    var name = document.getElementById('name').value;
    var company = document.getElementById('company').value;
    var age = document.getElementById('age').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var accountType = document.getElementById('accountType').value;

    // Password != confirm password
    if(password != confirmPassword)
    {
      console.log('Passwords do not match');
      return;
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
        if(err !== null){
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