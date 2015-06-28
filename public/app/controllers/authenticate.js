
function tryLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    sendCommand('login', {
      username: username,
      password: password
    })

}
