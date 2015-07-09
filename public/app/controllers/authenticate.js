activeUser = null;

angular.module('userApp')
.controller('authController', function($scope, $http, $location){
  var vm = this;
  vm.activeUser = null;
  activeUser = null;

  // Try to authenticate the user (see if a cookie exists)
  $http.post('api/auth', {body: JSON.stringify({})})
  .success(function (data, status, xhr, config){
    if(!data.error)
    {
      console.log('Successfully Authentificated');
      vm.activeUser = data;
      activeUser = data;
    }
  })
  .error(function (data, status, xhr, config) {
    console.log(data);
  });

  $scope.trySignup = function() {
    var name = document.getElementById('name').value.trim();
    var company = document.getElementById('company').value.trim();
    var age = document.getElementById('age').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var address = document.getElementById('address').value.trim();

    var username = document.getElementById('signupusername').value.trim();
    var password = document.getElementById('signuppassword').value.trim();
    var confirmPassword = document.getElementById('confirmPassword').value.trim();
    var accountTypeField = document.getElementById('accountType');

    var accountType = accountTypeField.options[accountTypeField.selectedIndex].value.trim();

    // Password != confirm password
    if(password != confirmPassword)
    {
      return console.log('Passwords do not match');
    }

    $http.post('api/signup', {body: JSON.stringify(
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
      }
    )})
    .success(function (data, status, xhr, config){
      $location.path("/account");
      vm.activeUser = data;
      activeUser = data;
    })
    .error(function (data, status, xhr, config){
      // TODO: Show popup
      console.log(data);
    });
  }


  $scope.tryLogin = function() {
    var username = document.getElementById('loginusername').value.trim();
    var password = document.getElementById('loginpassword').value.trim();
    $http.post('api/login', {body: JSON.stringify(
      {
        username: username,
        password: password
      }
    )})
    .success(function (data, status, xhr, config){
      $location.path("/account");
      vm.activeUser = data;
      activeUser = data;
    })
    .error(function (data, status, xhr, config){
      //TODO: Show popup
      console.log(data);
    });
  }


  $scope.tryLogout =  function() {
    $http.post('api/logout', {body: JSON.stringify({})})
    .success(function (data, status, xhr, config){
      $location.path("/login");
      vm.activeUser = null;
      activeUser = null;
    })
    .error(function (data, status, xhr, config) {
      //TODO: Show popup
      console.log(data);
    });
  }

  $scope.tryResetPassword = function() {
    var email = document.getElementById('resetemail').value.trim();
    $http.post('api/reset', {body: JSON.stringify(
      {
        email: email
      }
    )})
    .success(function (data, status, xhr, config){
      $location.path("/home");
    })
    .error(function (data, status, xhr, config) {
      //TODO: Show popup
      console.log(data);
    });
  }




});






