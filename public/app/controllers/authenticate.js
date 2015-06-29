angular.module('userApp')
.controller('authController', function($scope, $rootScope, $http){
  var vm = this;
  vm.activeUser = null;

  // Try to authenticate the user (see if a cookie exists)
  $http.post('api/auth', {body: JSON.stringify({})})
  .success(function (data, status, xhr, config){
    console.log('Successfully Authentificated');
    vm.activeUser = data;
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

    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();
    var confirmPassword = document.getElementById('confirmPassword').value.trim();
    var accountType = document.getElementById('accountType').value.trim();

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
      console.log(data);
    })
    .error(function (data, status, xhr, config){
      console.log(data);
    });
  }


  $scope.tryLogin = function() {
    console.log('Here');
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();
    $http.post('api/login', {body: JSON.stringify(
      {
        username: username,
        password: password
      }
    )})
    .success(function (data, status, xhr, config){
      console.log(data);
      vm.activeUser = data;
    })
    .error(function (data, status, xhr, config){
      console.log(data);
    });
  }


  $scope.tryLogout =  function() {
    console.log('TLO');
    console.log(vm);

    $http.post('api/logout', {body: JSON.stringify({})})
    .success(function (data, status, xhr, config){
      return vm.activeUser = null;
    })
    .error(function (data, status, xhr, config) {
      console.log(data);
    });
  }




});






