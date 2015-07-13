activeUser = null;

angular.module('userApp')
.controller('contactController', function($scope, $http, $location, $routeParams, ngDialog){

  $scope.sendContact = function() {
    var alert = angular.element(document.getElementById('alertController')).scope().alert;
    var email = document.getElementById('email').value.trim();
    var subject = document.getElementById('subject').value.trim();
    var inputDetailsText = document.getElementById('inputDetailsText').value.trim();

    if(!ClientUtils.validateEmail(email)) {
      return alert.showAlert('Please enter a valid email');
    }

    $http.post('api/contact',
      {
        body: JSON.stringify( {
          from: email,
          subject: subject,
          text: inputDetailsText
        })
      }
    )
    .success(function (data, status, xhr, config){
      return alert.showAlert('Email successfully sent!');
    })
    .error(function (data, status, xhr, config){
      return alert.showAlert(data.error);
    });
  }

});






