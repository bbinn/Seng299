angular.module('userApp').controller('ScheduleController', ['$scope', '$http', function($scope, $http) {
  var vm = this;
  vm.date = new Date();
  vm.lunchBooths = [];
  vm.produceBooths = [];
  vm.merchBooths = [];

  if (vm.date.getDay() == 1) {
    //monday is not a thing
    vm.date.setDate(vm.date.getDate() + 1);
  }

  vm.repopulate = function() {
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
  }


  vm.changeDay = function(newDay) {
    var oldDay = vm.date.getDay();
    var deltaDay = newDay-oldDay;
    vm.day=days[newDay];
    vm.date.setDate(vm.date.getDate() + deltaDay);
    vm.day = vm.date.getDate();
  };

  vm.nextWeek = function() {
    vm.date.setDate(vm.date.getDate() + 7);
  }
  vm.prevWeek = function() {
    vm.date.setDate(vm.date.getDate() - 7);
  }

  vm.repopulate();

}]);
