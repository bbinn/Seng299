
angular.module('userApp')
.controller('uploadController', ['$scope', 'FileUploader', '$rootScope', function($scope, FileUploader, $rootScope){

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
    activeUser.avatarLink = response.file;
    $rootScope.$apply();
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
    activeUser.bannerLink = response.file;
    $rootScope.$apply();
  };


}]);






