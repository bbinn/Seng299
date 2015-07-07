angular.module('userApp').controller('profileController', ['$scope', '$http', '$sce', '$routeParams', function($scope, $http, $sce, $routeParams) {

	/*
	From class diagram
	Properties:
		displayedProfile: Account
		bookedBooths: List<Booth>
	Classes:
		-constructor()
		getInstance()
		editProfile()
		follow()
		unfollow()
		unbookBooth()
		-repopulate()
		-notifyFollowers()
	*/
	var vm = this;

	vm.date = new Date();
	vm.activeBooths = [];
	vm.canBook = false;
	vm.hasBooths = false;
	// default profile picture and banner
	vm.genericProfileImage = $sce.trustAsResourceUrl('../../assets/generic_profile.png');
	vm.genericBannerImage = $sce.trustAsResourceUrl('../../assets/generic_banner.jpg');

	vm.getAccount = function(curr_user_id) {
		$http.post('api/getaccount', {body: JSON.stringify({ vendorId: curr_user_id})})
			.success(function(data, status, headers, config) {
				console.log(data.docs);
				vm.userName = data.docs[0].name;
				// vm.desc = data.docs[0].description;
				// user has the ability to book booths
				if (data.docs[0].accountType === "vendor") {
					vm.canBook = true;
				}
			});
	};

	vm.getActiveBooths = function(curr_user_id) {
		$http.post('api/getbooths', {body: JSON.stringify({ vendorId: curr_user_id})})
			.success(function(data, status, headers, config) {
				console.log(data.docs);

				for (var i = 0; i < data.docs.length; i++) {
					vm.activeBooths[i] = {title: data.docs[i].title, boothType: data.docs[i].boothType, timeSlot: data.docs[i].timeSlot, description: data.docs[i].description };
				}

				if (data.docs.length > 0) {
					vm.hasBooths = true;
				}

			});
	};



	var user;
	vm.userID = $routeParams.user_id;
	if (typeof vm.userID === 'undefined') {
		vm.userID = activeUser._id;
	} 
	vm.getAccount(vm.userID);
	
	vm.getActiveBooths(vm.userID);

	/* TEST CODE with dummy data */

	// need to add a way to add a description associated with the user
	vm.desc = "Yes, shrubberies are my trade. I am a shrubber. My name is Roger the Shrubber. I arrange, design, and sell shrubberies. Yes, shrubberies are my trade. I am a shrubber. My name is Roger the Shrubber. I arrange, design, and sell shrubberies.";

/* END TEST CODE */ 

}]);