angular.module('userApp').controller('AdminController', ['$scope', '$http', 'ngDialog', function($scope, $http, ngDialog) {
  var vm = this;
  vm.pending = [];

  vm.repopulate = function() {
    vm.pending = [];
    $http.post('api/getpending', {body: ''})
    .success(function (data, status, xhr, config) {
      for (var i = 0; i < data.docs.length; i++) {
        var vendor = {}
        vendor.vendor = data.docs[i];
        vendor.state = "";
        vm.pending[i] = vendor;
      }
    });
  }

  vm.markConfirm = function(vendor) {
    for(var i = 0; i < vm.pending.length; i++) {
      if(vm.pending[i].vendor.username == vendor) {
        vm.pending[i].state = "confirm";
        break;
      }
    }
  }

  vm.markDeny = function(vendor) {
    for(var i = 0; i < vm.pending.length; i++) {
      if(vm.pending[i].vendor.username == vendor) {
        vm.pending[i].state = "deny";
        break;
      }
    }
  }

  vm.markCancel = function(vendor) {
    for(var i = 0; i < vm.pending.length; i++) {
      if(vm.pending[i].vendor.username == vendor) {
        vm.pending[i].state = "";
        break;
      }
    }
  }

  vm.submit = function() {
    var confirm = [];
    var deny = [];
    for(var i = 0; i < vm.pending.length; i++) {
      var entry = vm.pending[i];
      if(entry.state == "confirm") {
        confirm.push(entry.vendor.username);
      }
      else if (entry.state == "deny") {
        deny.push(entry.vendor.username);
      }
    }
    $http.post('api/confirmvendor', {body: JSON.stringify({usernames: confirm})})
    .success(function(data, status, xhr, config) {
      $http.post('api/denyvendor', {body: JSON.stringify({usernames: deny})})
      .success(function(data, status, xhr, config) {
        vm.repopulate();
      });
    });
  }

  vm.hasChanges = function() {
    for(var i = 0; i < vm.pending.length; i++) {
      var entry = vm.pending[i];
      if(entry.state != "") {
        return true;
      }
    }
    return false;
  }

  vm.repopulate();

}]);

