
angular.module('userApp')
.controller('uploadController', ['$scope', 'FileUploader', function($scope, FileUploader){
  var uploader = $scope.uploader = new FileUploader({
    url: 'api/upload',
    withCredentials: true
  });

  uploader.onAfterAddingFile = function(fileItem) {
    fileItem.upload();
  };

  uploader.onCompleteItem = function(fileItem, response, status, headers) {
    console.log("Uploaded: " + response.file);
  };


}]);






