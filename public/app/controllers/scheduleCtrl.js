var currentBooth = null;

angular.module('userApp').controller('ScheduleController', ['$scope', '$http', 'ngDialog', function($scope, $http, ngDialog) {
  'use strict';



  var vm = this;
  var today = new Date();
  vm.date = new Date(today.getYear(), today.getMonth(), today.getDay(), 0, 0, 0, 0);
  vm.booths = [];
  vm.lunchBooths = [];
  vm.produceBooths = [];
  vm.merchBooths = [];

  //Set the current day as checked by default
  var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  var daybox = document.getElementById(days[vm.date.getDay()]);
  daybox.checked = true;


  vm.repopulate = function() {
    var defaultText = "Empty";

    //allow vendors and admins to book booths
    if (activeUser && (activeUser.accountType == "vendor" || activeUser.accountType == "admin")) {
      defaultText = "+ Book this booth";
    }

    $http.post('api/getbooths', {body: JSON.stringify({ timeSlot: vm.date })})
    .success(function (data, status, xhr, config) {
      //fill all booths with default value
      for (var i = 0; i < 3; i++) {
        for (var i = 0; i < 6; i++) {
          vm.lunchBooths[i] = {title: defaultText, id: i, type: 'lunch', unbooked: true};
        }
        for (var i = 0; i < 8; i++) {
          vm.produceBooths[i] = {title: defaultText, id: i, type: 'produce', unbooked: true};
        }
        for (var i = 0; i < 10; i++) {
          vm.merchBooths[i] = {title: defaultText, id: i, type: 'merch', unbooked: true};
        }
      }

      //fill existing booths with correct values
      for (var i = 0; i < data.docs.length; i++) {
        if (data.docs[i].boothType == 'lunch') {
          vm.lunchBooths[data.docs[i].boothNumber] = data.docs[i];
        }
        if (data.docs[i].boothType == 'produce') {
          vm.produceBooths[data.docs[i].boothNumber] = data.docs[i];
        }
        if (data.docs[i].boothType == 'merch') {
          vm.merchBooths[data.docs[i].boothNumber] = data.docs[i];
        }
      }
    });
  }


  vm.changeDay = function(newDay) {
    var oldDay = vm.date.getDay();
    var deltaDay = newDay-oldDay;
    vm.date.setDate(vm.date.getDate() + deltaDay);
    vm.day = vm.date.getDate();
    vm.repopulate();
  };

  //when the week change buttons get pressed
  vm.nextWeek = function() {
    vm.date.setDate(vm.date.getDate() + 7);
    vm.repopulate();
  }
  vm.prevWeek = function() {
    vm.date.setDate(vm.date.getDate() - 7);
    vm.repopulate();
  }

  vm.showDialog = function(booth) {
    //only let vendors and admins book booths
    if (!activeUser || (activeUser.accountType != "vendor" && activeUser.accountType != "admin")) {
      return;
    }
    if (booth.unbooked) {
      //open the book booth dialog
      ngDialog.openConfirm({
        template: 'app/views/pages/BookBoothPopup.html',
        scope: $scope,
        controller: 'BoothPopupController'
      }).then(
        function(value) {
          //find out if the user really wants to book the booth
          ngDialog.openConfirm({
            template: 'app/views/pages/ConfirmationPopup.html'
          }).then(
            function() {
              $http.post('api/bookbooth', {body: JSON.stringify({
                title:       value[0],
                timeSlot:    vm.date,
                vendorId:    activeUser.id,
                boothType:   booth.type,
                boothNumber: booth.id,
                description: value[1]
              })})
              .success(function(data, status, xhr, config) {
                console.log(data);
                vm.repopulate();
              })
              .error(function(data, status, xhr, config) {
                console.log("hello");
                console.log(data);
              });
            },
            function(value) { } //just close if "no" was pressed
          )
        },
        function(value) { } //just close if "cancel" was pressed
      );
    }
    else {
      //open the view booth dialog
      currentBooth = booth;
      ngDialog.open({
        template: 'app/views/pages/ViewBoothPopup.html',
        scope: $scope,
        controller: 'BoothPopupController'
      });
    }
  }
  vm.repopulate();


}]);
angular.module('userApp').controller('BoothPopupController', function($scope){
  var pp = this;
  pp.booth = currentBooth;
  vm.showDialog = function(boothId) {
    if (boothId == -1) {
      return;
    }

    ngDialog.openConfirm({
      template: 'app/views/pages/BookBoothPopup.html',
      scope: $scope,
      controller: 'BoothPopupController'
    }).then(
      function(value) {
        console.log(value);
      },
      function(value) {
        console.log(value);
      }
    );
  }

});
angular.module('userApp').controller('BoothPopupController', function($scope){
  var pp = this;
  pp.booth = currentBooth;
})
