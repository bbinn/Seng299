angular.module('userApp').controller('AdminController', ['$scope', '$http', 'ngDialog', function($scope, $http, ngDialog) {
  var vm = this;
  vm.pending = [];

  vm.repopulate = function() {
    vm.pending = [];
    $http.post('api/getpending', {body: ''})
    .success(function (data, status, xhr, config) {
      for (var i = 0; i < data.docs.length; i++) {
        console.log(data.docs[i]);
        vm.pending[i] = data.docs[i];
      }
    });
  }

  vm.confirm = function(vendor) {
    $http.post('api/confirmvendor', {body: JSON.stringify({ username: vendor })})
    .success(function (data, status, xhr, config) {
      vm.repopulate();
    });
  }

  vm.deny = function(vendor) {
    $http.post('api/denyvendor', {body: JSON.stringify({ username: vendor })})
    .success(function (data, status, xhr, config) {
      vm.repopulate();
    });
  }

  vm.repopulate();

}]);

