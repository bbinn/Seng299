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
  vm.lunchBooths = [];
  vm.produceBooths = [];
  vm.merchBooths = [];

  if (vm.date.getDay() == 1) {
    //monday is not a thing
    vm.date.setDate(vm.date.getDate() + 1);
  }

  vm.repopulate = function() {
<<<<<<< HEAD
    //getbooths(vm.day)

    for (var i = 0; i < 3; i++) {
      vm.booths[i] = [];
      for (var j = 0; j < 10; j++)
        vm.booths[i][j] = {name: "+ Book this booth", id: i+j}
    }

    for (var i = 0; i < 6; i++) {
      vm.lunchBooths[i] = {name: "+ Book this booth", id: i}
    }
    for (var i = 0; i < 8; i++) {
      vm.produceBooths[i] = {name: "+ Book this booth", id: i}
    }
    for (var i = 0; i < 10; i++) {
      vm.merchBooths[i] = {name: "+ Book this booth", id: i}
    }
=======
    for (var i = 0; i < 6; i++) {
      vm.lunchBooths[i] = {name: "+ Book this booth", id: "book/"+i}
    }
    for (var i = 0; i < 8; i++) {
      vm.produceBooths[i] = {name: "+ Book this booth", id: "book/"+i}
    }
    for (var i = 0; i < 10; i++) {
      vm.merchBooths[i] = {name: "+ Book this booth", id: "book/"+i}
    }
    //TEMP CODE
    vm.lunchBooths[1] = {name: "Rocking Moroccan Deli", id: "booth/12"}
    //END TEMP
>>>>>>> initial commit of schedule page, includes working date picker, and a table of booths
  }


  vm.changeDay = function(newDay) {
    var oldDay = vm.date.getDay();
    var deltaDay = newDay-oldDay;
<<<<<<< HEAD
    vm.date.setDate(vm.date.getDate() + deltaDay);
    vm.day = vm.date.getDate();
    vm.repopulate();
=======
    vm.day=days[newDay];
    vm.date.setDate(vm.date.getDate() + deltaDay);
    vm.day = vm.date.getDate();
>>>>>>> initial commit of schedule page, includes working date picker, and a table of booths
  };

  vm.nextWeek = function() {
    vm.date.setDate(vm.date.getDate() + 7);
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
  }

  vm.repopulate();

}]);
