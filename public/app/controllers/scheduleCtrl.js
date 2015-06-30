angular.module('userApp').controller('ScheduleController', ['$scope', '$http', 'ngDialog', function($scope, $http, ngDialog) {
  var vm = this;
  vm.date = new Date();
  vm.booths = [];
  vm.lunchBooths = [];
  vm.produceBooths = [];
  vm.merchBooths = [];

  if (vm.date.getDay() == 1) {
    //monday is not a thing
    vm.date.setDate(vm.date.getDate() + 1);
  }

  vm.repopulate = function() {
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
    }
  }


  vm.changeDay = function(newDay) {
    var oldDay = vm.date.getDay();
    var deltaDay = newDay-oldDay;
    vm.date.setDate(vm.date.getDate() + deltaDay);
    vm.day = vm.date.getDate();
    vm.repopulate();
  };

  vm.nextWeek = function() {
    vm.date.setDate(vm.date.getDate() + 7);
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
