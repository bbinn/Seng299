activeUser = null;

angular.module('userApp')
.controller('authController', function($scope, $http, $location, $routeParams, ngDialog){
  var vm = this;
  vm.activeUser = null;
  activeUser = null;

  // Try to authenticate the user (see if a cookie exists)
  $http.post('api/auth', {body: JSON.stringify({})})
  .success(function (data, status, xhr, config){
    if(!data.error)
    {
      vm.activeUser = data;
      activeUser = data;
    }
  })
  .error(function (data, status, xhr, config) {
    ngDialog.open({
      template: 'app/views/pages/popup/error.html'
    });
  });

  $scope.trySignup = function() {

    var alert = angular.element(document.getElementById('alertController')).scope().alert;

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

    // All fields are filled in
    if(name.length == 0 ||
      company.length ==0 ||
      age.length == 0 ||
      email.length == 0 ||
      phone.length == 0 ||
      address.length == 0 ||
      username.length == 0||
      password.length == 0 ||
      accountType.length == 0
    ){
      return alert.showAlert('Please fill out all the fields');
    }

    // Password != confirm password
    if(password != confirmPassword)
    {
      return alert.showAlert('Passwords do not match');
    }

    // Invalid email
    if(!ClientUtils.validateEmail(email)){
      return alert.showAlert('Please enter a valid email');
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
      console.log(data);
      if(data.error){
        return alert.showAlert(data.error);
      }
      else
      {
        return alert.showAlert('An error occured on the server');
      }
    });
  }


  $scope.tryLogin = function() {
    var alert = angular.element(document.getElementById('alertController')).scope().alert;
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
      return alert.showAlert(data.error);
    });
  }


  $scope.tryLogout =  function() {
    var alert = angular.element(document.getElementById('alertController')).scope().alert;
    $http.post('api/logout', {body: JSON.stringify({})})
    .success(function (data, status, xhr, config){
      $location.path("/login");
      vm.activeUser = null;
      activeUser = null;
    })
    .error(function (data, status, xhr, config) {
      return alert.showAlert(data.error);
    });
  }

  $scope.tryResetPassword = function() {
    var alert = angular.element(document.getElementById('alertController')).scope().alert;
    var email = document.getElementById('resetemail').value.trim();
    if(!ClientUtils.validateEmail(email)){
      return alert.showAlert('Please enter a valid email');
    }
    $http.post('api/reset', {body: JSON.stringify(
      {
        email: email
      }
    )})
    .success(function (data, status, xhr, config){
      return alert.showAlert('An email has been sent!');
    })
    .error(function (data, status, xhr, config) {
      return alert.showAlert('An error occured on the server');
    });
  }

  $scope.resetPassword = function() {
    var alert = angular.element(document.getElementById('alertController')).scope().alert;
    var token = $routeParams.token_id;
    var password = document.getElementById('password').value.trim();
    var confirmpassword = document.getElementById('confirmpassword').value.trim();
    if(password != confirmpassword)
    {
      return alert.showAlert('Passwords do not match');
    }

    $http.post('api/doreset', {body: JSON.stringify(
      {
        token: token,
        password: password
      }
    )})
    .success(function (data, status, xhr, config){
      return alert.showAlert('Success! You may log in now.');
    })
    .error(function (data, status, xhr, config) {
      return alert.showAlert(data.error);
    });
  }




});






