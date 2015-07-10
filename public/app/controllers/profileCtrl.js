angular.module('userApp').controller('profileController', ['$scope', '$http', '$sce', '$routeParams', 'ngDialog', function($scope, $http, $sce, $routeParams, ngDialog) {
	var vm = this;

	vm.m_names = new Array("January", "February", "March", "April",
	"May", "June", "July", "August","September", "October", "November", "December");

	vm.date = new Date();
	vm.activeBooths = [];
	vm.canBook = false;
	vm.hasBooths = false;
	vm.editClicked = false;

		// default profile picture and description
	vm.avatarLink = $sce.trustAsResourceUrl('../../assets/generic_profile.png');
	vm.description = "This user has not provided a description.";

	vm.getAccount = function(curr_user_id) {
		$http.post('api/getaccount', {body: JSON.stringify({ vendorId: curr_user_id})})
			.success(function(data, status, headers, config) {
				vm.userName = data.docs[0].name;
				vm.avatarLink = data.docs[0].avatarLink;
				vm.bannerLink = data.docs[0].bannerLink;
				if (typeof data.docs[0].description !== "undefined") {
					vm.description = data.docs[0].description;
				}
				// user has the ability to book booths
				if (data.docs[0].accountType === "vendor") {
					vm.canBook = true;
				}
			});
	};

	vm.getActiveBooths = function(curr_user_id) {
		vm.activeBooths = [];
		$http.post('api/getbooths', {body: JSON.stringify({ vendorId: curr_user_id})})
			.success(function(data, status, headers, config) {
				var boothDate, dt;
				var docs = data.docs;
				for (var i = 0; i < docs.length; i++) {
					dt = new Date(docs[i].timeSlot);
    			boothDate = vm.m_names[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();
					vm.activeBooths[i] = {title: docs[i].title, boothType: docs[i].boothType, timeSlot: boothDate, description: docs[i].description, boothNumber: docs[i].boothNumber };
				}

				if (data.docs.length > 0) {
					vm.hasBooths = true;
				}

			});
	};

	vm.unbookBoothDialog = function(booth) {

    ngDialog.openConfirm({
      template: 'app/views/pages/popup/ConfirmationPopup.html'
    }).then(
      function() {
        $http.post('api/unbook', {body: JSON.stringify({
          timeSlot: booth.timeSlot,
          boothNumber: booth.boothNumber,
          boothType: booth.boothType
        })})
        .success (function (data, status, xhr, config) {
					vm.getActiveBooths(vm.userID);
        })
        .error(function (data, status, xhr, config){
        });
      },
      function() {
        //do nothing
      }
    )
  };
	vm.toggleEditField = function() {
		if (vm.editClicked == false) {
			vm.editClicked = true;
		} else {
			vm.editClicked = false;
		}
	};

	vm.editDescription = function() {

		var curr_user_id = vm.userID;
		var new_description = document.getElementById('descriptionEditField').value.trim();

		$http.post('api/changeaccount', {body: JSON.stringify({vendorId: curr_user_id, description: new_description})})
			.success(function(data, status, headers, config) {
		});

		vm.toggleEditField();
	};

	var user;

	vm.userID = $routeParams.user_id;

	if (typeof vm.userID === 'undefined') {
		vm.userID = activeUser._id;
	}

	vm.getAccount(vm.userID);
	vm.getActiveBooths(vm.userID);

}
]);
