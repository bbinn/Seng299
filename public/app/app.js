angular.module('userApp', [])
.controller('mainController', function(){

  var vm = this;

  // basic variable to display
  vm.message ="SENG 299 - Group 6 tutorial angular"

  // a list of students that will be displayed on the home page
  vm.students = [
    {first: "David", last: "Johnson"},
    {first: "Ernest", last: "Aaron"}
  ];
});