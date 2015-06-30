<<<<<<< HEAD
<<<<<<< HEAD
angular.module('userApp').controller('ScheduleController', ['$scope', '$http', 'ngDialog', function($scope, $http, ngDialog) {
  var vm = this;
  vm.date = new Date();
  vm.booths = [];
=======
angular.module('userApp').controller('ScheduleController', ['$scope', '$http', function($scope, $http) {
  var vm = this;
  vm.date = new Date();
>>>>>>> initial commit of schedule page, includes working date picker, and a table of booths
=======
angular.module('userApp').controller('ScheduleController', ['$scope', '$http', 'ngDialog', function($scope, $http, ngDialog) {
  var vm = this;
  vm.date = new Date();
  vm.booths = [];
>>>>>>> ngdialog has been implemented and popups for the schedule page are working
  vm.lunchBooths = [];
  vm.produceBooths = [];
  vm.merchBooths = [];

  if (vm.date.getDay() == 1) {
    //monday is not a thing
    vm.date.setDate(vm.date.getDate() + 1);
  }

  vm.repopulate = function() {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ngdialog has been implemented and popups for the schedule page are working
    //getbooths(vm.day)

    for (var i = 0; i < 3; i++) {
      vm.booths[i] = [];
      for (var j = 0; j < 10; j++)
        vm.booths[i][j] = {name: "+ Book this booth", id: i+j}
    }

<<<<<<< HEAD
    for (var i = 0; i < 6; i++) {
      vm.lunchBooths[i] = {name: "+ Book this booth", id: i}
    }
    for (var i = 0; i < 8; i++) {
      vm.produceBooths[i] = {name: "+ Book this booth", id: i}
    }
    for (var i = 0; i < 10; i++) {
      vm.merchBooths[i] = {name: "+ Book this booth", id: i}
=======
    var defaultText = "Empty";
    var defaultId = -1;
    if (vm.activeUser && (vm.activeUser.accountType == "vendor" || vm.activeUser.accountType == "admin")) {
      defaultText = "+ Book this booth"
      defaultId = 0;
    }

    $http.post('api/getbooths', {body: JSON.stringify({
      timeSlot: vm.date
    })})
    .success(function (data, status, xhr, config) {
      console.log(data);
    })
    .error(function (data, status, xhr, config) {
      console.log(data);
    });

    for (var i = 0; i < 3; i++) {
      vm.booths[i] = [];
      for (var j = 0; j < 10; j++) {
          vm.booths[i][j] = {name: defaultText, id: defaultId}
      }
      for (var i = 0; i < 6; i++) {
        vm.lunchBooths[i] = {name: defaultText, id: defaultId}
      }
      for (var i = 0; i < 8; i++) {
        vm.produceBooths[i] = {name: defaultText, id: defaultId}
      }
      for (var i = 0; i < 10; i++) {
        vm.merchBooths[i] = {name: defaultText, id: defaultId}
      }
>>>>>>>  stylying and popups now support input fields
    }
=======
=======
>>>>>>> ngdialog has been implemented and popups for the schedule page are working
    for (var i = 0; i < 6; i++) {
      vm.lunchBooths[i] = {name: "+ Book this booth", id: i}
    }
    for (var i = 0; i < 8; i++) {
      vm.produceBooths[i] = {name: "+ Book this booth", id: i}
    }
    for (var i = 0; i < 10; i++) {
      vm.merchBooths[i] = {name: "+ Book this booth", id: i}
    }
<<<<<<< HEAD
    //TEMP CODE
    vm.lunchBooths[1] = {name: "Rocking Moroccan Deli", id: "booth/12"}
    //END TEMP
>>>>>>> initial commit of schedule page, includes working date picker, and a table of booths
=======
>>>>>>> ngdialog has been implemented and popups for the schedule page are working
  }


  vm.changeDay = function(newDay) {
    var oldDay = vm.date.getDay();
    var deltaDay = newDay-oldDay;
<<<<<<< HEAD
<<<<<<< HEAD
    vm.date.setDate(vm.date.getDate() + deltaDay);
    vm.day = vm.date.getDate();
    vm.repopulate();
=======
    vm.day=days[newDay];
    vm.date.setDate(vm.date.getDate() + deltaDay);
    vm.day = vm.date.getDate();
>>>>>>> initial commit of schedule page, includes working date picker, and a table of booths
=======
    vm.date.setDate(vm.date.getDate() + deltaDay);
    vm.day = vm.date.getDate();
    vm.repopulate();
>>>>>>> ngdialog has been implemented and popups for the schedule page are working
  };

  vm.nextWeek = function() {
    vm.date.setDate(vm.date.getDate() + 7);
<<<<<<< HEAD
<<<<<<< HEAD
    vm.repopulate();
  }
  vm.prevWeek = function() {
    vm.date.setDate(vm.date.getDate() - 7);
    vm.repopulate();
  }

  vm.showDialog = function(boothId) {
    ngDialog.open({
      template: '<div>'+boothId+'</div>',
      plain: true,
      appendTo: '.dialogClass'
    });

=======
  }
  vm.prevWeek = function() {
    vm.date.setDate(vm.date.getDate() - 7);
>>>>>>> initial commit of schedule page, includes working date picker, and a table of booths
=======
    vm.repopulate();
  }
  vm.prevWeek = function() {
    vm.date.setDate(vm.date.getDate() - 7);
    vm.repopulate();
  }

  vm.showDialog = function(boothId) {
    if (boothId == -1) {
      return;
    }

    ngDialog.open({
      template: 'app/views/pages/BookBoothPopup.html',
      scope: $scope,
      controller: 'BoothPopupController'
    });
<<<<<<< HEAD

>>>>>>> ngdialog has been implemented and popups for the schedule page are working
=======
>>>>>>>  stylying and popups now support input fields
  }

  // Try to authenticate the user (see if a cookie exists)
  $http.post('api/auth', {body: JSON.stringify({})})
  .success(function (data, status, xhr, config){
    console.log('Successfully Authentificated');
    vm.activeUser = data;
    vm.repopulate();
  })
  .error(function (data, status, xhr, config) {
    console.log(data);
    vm.repopulate();
  });

}]);
angular.module('userApp').controller('BoothPopupController', function($scope){

  $scope.myTextBox="my name is"



})
