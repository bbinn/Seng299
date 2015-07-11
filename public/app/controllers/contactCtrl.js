activeUser = null;

angular.module('userApp')
.controller('contactController', function($scope, $http, $location, $routeParams, ngDialog){

  $scope.sendContactEmail = function() {
    var alert = angular.element(document.getElementById('alertController')).scope().alert;
    var username = document.getElementById('email').value.trim();
    var password = document.getElementById('subject').value.trim();
    var password = document.getElementById('inputDetailsText').value.trim();
    $http.post('api/contact', {body: JSON.stringify(
      {
        from: email,
        subject: subject,
        text: text
      }
    )})
    .success(function (data, status, xhr, config){
      return alert.showAlert('Email successfully sent!');
    })
    .error(function (data, status, xhr, config){
      return alert.showAlert(data.error);
    });
  }

});






