
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

// TODO: This
function trySignup() {

}
