var currentBooth = null;

angular.module('userApp').controller('ScheduleController', ['$scope', '$http', 'ngDialog', function($scope, $http, ngDialog) {
  'use strict';

  var vm = this;
  var today = new Date();
  vm.date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0); //set hours, minutes, seconds, milliseconds to 0
  vm.booths = [];
  vm.lunchBooths = [];
  vm.produceBooths = [];
  vm.merchBooths = [];
  vm.currentUser = activeUser;

  //Set the current day as checked by default
  var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  var daybox = document.getElementById(days[vm.date.getDay()]);
  daybox.checked = true;

  vm.repopulate = function() {
    var defaultText = "Empty";

    //allow vendors and admins to book booths
    if (+vm.date > +today && activeUser && (activeUser.accountType == "vendor" || activeUser.accountType == "admin")) {
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

          if ((+vm.date > +today) && activeUser && (activeUser.accountType === "admin" || data.docs[i].vendorId === activeUser._id)) {
            vm.lunchBooths[data.docs[i].boothNumber].additionalText = "- Unbook This Booth";
          }
        }
        if (data.docs[i].boothType == 'produce') {
          vm.produceBooths[data.docs[i].boothNumber] = data.docs[i];

          if ((+vm.date > +today) && activeUser && (activeUser.accountType === "admin" || data.docs[i].vendorId === activeUser._id)) {
            vm.produceBooths[data.docs[i].boothNumber].additionalText = "- Unbook This Booth";
          }
        }
        if (data.docs[i].boothType == 'merch') {
          vm.merchBooths[data.docs[i].boothNumber] = data.docs[i];

          if ((+vm.date > +today) && activeUser && (activeUser.accountType === "admin" || data.docs[i].vendorId === activeUser._id)) {
            vm.merchBooths[data.docs[i].boothNumber].additionalText = "- Unbook This Booth";
          }
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


  vm.unbookBoothDialog = function(booth) {
    ngDialog.openConfirm({
      template: 'app/views/pages/popup/unbookConfirm.html'
    }).then(
      function() {
        var locked = null
        var oneDayFromNow = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1, 0, 0, 0, 0); //set hours, minutes, seconds, milliseconds to 0
        if (vm.date <= oneDayFromNow && vm.date > today && activeUser.accountType != "admin") {
          locked = today;
          activeUser.locked = today;
        }
        $http.post('api/unbook', {body: JSON.stringify({
          timeSlot: vm.date,
          boothNumber: booth.boothNumber,
          boothType: booth.boothType,
          locked: locked
        })})
        .success (function (data, status, xhr, config) {
          vm.repopulate();
        })
        .error(function (data, status, xhr, config){
        });
      },
      function() {
        //do nothing
      }
    )
  }

  vm.showDialog = function(booth) {
    //only let vendors and admins book booths
    if (booth.unbooked) {
      if (+vm.date <= +today || !activeUser || (activeUser.accountType != "vendor" && activeUser.accountType != "admin")) {
        return;
      }
      //if the vendor screwed up recently, don't allow bookbooth to happen
      var twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(twoDaysAgo.getDate()-2);
      console.log(+activeUser.locked);
      console.log(+twoDaysAgo);
      var locked = new Date(activeUser.locked);
      if (+locked > +twoDaysAgo) {
        ngDialog.open({
          template: '<h1> You cannot book with a locked account </h1>',
          plain: true
        });
        return;
      }
      //open the book booth dialog
      ngDialog.openConfirm({
        template: 'app/views/pages/popup/BookBoothPopup.html',
        scope: $scope,
        controller: 'BoothPopupController'
      }).then(
        function(value) {
          //find out if the user really wants to book the booth
          ngDialog.openConfirm({
            template: 'app/views/pages/popup/ConfirmationPopup.html'
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
                console.log(data);
              });
            },
            function(value) { } //just close if "no" was pressed to the confirmation dialog
          )
        },
        function(value) { } //just close if "cancel" was pressed in the book booth dialog
      );
    }
    else {
      //open the view booth dialog
      currentBooth = booth;
      ngDialog.open({
        template: 'app/views/pages/popup/ViewBoothPopup.html',
        scope: $scope,
        controller: 'BoothPopupController'
      });
    }
  }
  vm.repopulate();


}]);
angular.module('userApp').controller('BoothPopupController', function($scope, $http){
  var pp = this;
  pp.booth = currentBooth;
  if (currentBooth == null) {
    return;
  }
  $http.post('api/getaccount', {body: JSON.stringify({
    vendorId: pp.booth.vendorId
  })})
  .success (function (data, status, xhr, config) {
    pp.booth.vendorName = data.docs[0].name;
  })
  .error (function (data, status, xhr, config) {

  });
})
