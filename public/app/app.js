angular.module('userApp', ['ngRoute'])
.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: '/app/views/pages/home.html'
      })
      .when('/vendors', {
        templateUrl: '/app/views/pages/vendors.html'
      })
      .when('/schedule', {
        templateUrl: '/app/views/pages/schedule.html'
      })
      .when('/account', {
        templateUrl: '/app/views/pages/account.html'
      })
      .when('/contact', {
        templateUrl: '/app/views/pages/contact.html'
      })
      .when('/about', {
        templateUrl: '/app/views/pages/about.html'
      })
      .when('/login', {
        templateUrl: '/app/views/pages/login.html'
      })
      .when('/signup', {
        templateUrl: '/app/views/pages/signup.html'
      })
    $locationProvider.html5Mode(true);
}])
.controller('mainController', function(){

  var vm = this;
  vm.activeUser = null;

  // Try to authenticate the user (see if a cookie exists)
  sendCommand(
    'auth', {},
    function(err, user) {
      if(err == null) {
        console.log('Successfully Authentificated');
        activeUser = user;
        vm.activeUser = user;
      }
    }
  );

});
