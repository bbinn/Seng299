
angular.module('userApp')
.controller('uploadController', function($scope, FileUploader){
  $scope.uploader = new FileUploader();
});






