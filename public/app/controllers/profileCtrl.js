angular.module('userApp').controller('profileController', ['$scope', '$http', '$sce', '$routeParams', function($scope, $http, $sce, $routeParams) {

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
		$http.post('api/getbooths', {body: JSON.stringify({ vendorId: curr_user_id})})
			.success(function(data, status, headers, config) {
				var boothDate, dt;
				for (var i = 0; i < data.docs.length; i++) {
					dt = new Date(data.docs[i].timeSlot);
    			boothDate = vm.m_names[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();
					vm.activeBooths[i] = {title: data.docs[i].title, boothType: data.docs[i].boothType, timeSlot: boothDate, description: data.docs[i].description };
				}

				if (data.docs.length > 0) {
					vm.hasBooths = true;
				}

			});
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

}]);