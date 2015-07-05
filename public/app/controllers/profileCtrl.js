angular.module('userApp').controller('profileController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

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
	vm.activeBooths = [];
	// TODO: change default back to false
	vm.canBook = true;
	vm.hasBooths = true;
	// default profile picture and banner
	vm.genericProfileImage = $sce.trustAsResourceUrl('../../assets/generic_profile.png');
	vm.genericBannerImage = $sce.trustAsResourceUrl('../../assets/generic_banner.jpg');
	
	vm.userName = activeUser.name;

	// user has the ability to book booths
	if (activeUser.accountType == "vendor") {
		vm.canBook = true;
	}
	
	vm.getActiveBooths = function() {
		$http.post('api/getbooths', {body: JSON.stringify({ vendorId: activeUser._id})})
			.success(function(data, status, headers, config) {
				for (int i = 0; i < data.docs.length; i++) {
					vm.activeBooths[i] = {title: data.docs[i].title, boothType: data.docs[i].boothType, description: data.docs[i].description };
				}
			});

	};

	vm.getActiveBooths();

	if (activeBooths.length < 0) {
		vm.hasBooths = false;
	}
	
	/* TEST CODE with dummy data */

	// need to add a way to add a description associated with the user
	vm.desc = "Yes, shrubberies are my trade. I am a shrubber. My name is Roger the Shrubber. I arrange, design, and sell shrubberies. Yes, shrubberies are my trade. I am a shrubber. My name is Roger the Shrubber. I arrange, design, and sell shrubberies.";

/* END TEST CODE */ 
}]);