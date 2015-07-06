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

	vm.date = new Date();
	vm.activeBooths = [];
	vm.canBook = false;
	vm.hasBooths = false;
	// default profile picture and banner

	var user = activeUser || {};
	vm.userName = user.name;


	console.log(user.avatarLink);
	console.log(user.bannerLink);
	vm.profileImage = $sce.trustAsResourceUrl(user.avatarLink);
	vm.bannerImage = $sce.trustAsResourceUrl(user.bannerLink);


	// user has the ability to book booths
	if (user.accountType == "vendor") {
		vm.canBook = true;
	}

	vm.getActiveBooths = function() {
		$http.post('api/getbooths', {body: JSON.stringify({ vendorId: user._id})})
			.success(function(data, status, headers, config) {
				console.log(data.docs);
				for (var i = 0; i < data.docs.length; i++) {
					vm.activeBooths[i] = {title: data.docs[i].title, boothType: data.docs[i].boothType, timeSlot: data.docs[i].timeSlot, description: data.docs[i].description };
					console.log(vm.activeBooths[i]);
				}

				if (data.docs.length > 0) {
					vm.hasBooths = true;
				}

			});

	};

	vm.getActiveBooths();

	/* TEST CODE with dummy data */

	// need to add a way to add a description associated with the user
	vm.desc = "Yes, shrubberies are my trade. I am a shrubber. My name is Roger the Shrubber. I arrange, design, and sell shrubberies. Yes, shrubberies are my trade. I am a shrubber. My name is Roger the Shrubber. I arrange, design, and sell shrubberies.";

/* END TEST CODE */

}]);