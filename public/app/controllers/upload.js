
angular.module('userApp')
.controller('uploadController', ['$scope', 'FileUploader', function($scope, FileUploader){

  //Upload Avatar
  var avatarUploader = $scope.avatarUploader = new FileUploader({
    url: 'api/uploadavatar',
    withCredentials: true
  });

  avatarUploader.onAfterAddingFile = function(fileItem) {
    fileItem.upload();
  };

  avatarUploader.onCompleteItem = function(fileItem, response, status, headers) {
    console.log("Uploaded: " + response.file);
  };

  //Upload Avatar
  var bannerUploader = $scope.bannerUploader = new FileUploader({
    url: 'api/uploadbanner',
    withCredentials: true
  });

  bannerUploader.onAfterAddingFile = function(fileItem) {
    fileItem.upload();
  };

  bannerUploader.onCompleteItem = function(fileItem, response, status, headers) {
    console.log("Uploaded: " + response.file);
  };


}]);






