//
// Generic alerts. Call showAlert(message) to display any message to
// The screen in a little popup window (clean!)
//

angular.module('userApp').controller('alertController', ['$scope', 'ngDialog', function($scope, ngDialog) {
  var vm = this;
  vm.showAlert = function(message) {
    vm.message = message
    ngDialog.open({
      template: 'app/views/pages/popup/alert.html',
      scope: $scope,
      controller: 'alertController'
    });
  }
}]);