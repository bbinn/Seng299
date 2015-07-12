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
    for(var i = 0; i < vm.pending.length; i++) {
      var entry = vm.pending[i];
      if(entry.state == "confirm") {
        vm.confirm(entry.vendor.username);
      }
      else if (entry.state == "deny") {
        vm.deny(entry.vendor.username);
      }
    }
    vm.repopulate();
  }

  vm.confirm = function(vendor) {
    $http.post('api/confirmvendor', {body: JSON.stringify({ username: vendor })});
  }

  vm.deny = function(vendor) {
    $http.post('api/denyvendor', {body: JSON.stringify({ username: vendor })});
  }

  vm.repopulate();

}]);

