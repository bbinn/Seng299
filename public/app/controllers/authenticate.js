
function tryLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    sendCommand(
      'login',
      {
        username: username,
        password: password
      },
      function(error, message) {
        if(error !== null){
          //Error occured. Handle it here
          console.log(error);
        }
        else
        {
          //Success - do successful login here
        }
      }
    );
}

// TODO: This
function trySignup() {

}
