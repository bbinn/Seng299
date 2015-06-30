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

	/* TEST CODE with dummy data */
	var vm = this;

	vm.userName = "Roger the Shrubber";
	vm.desc = "Yes, shrubberies are my trade. I am a shrubber. My name is Roger the Shrubber. I arrange, design, and sell shrubberies. Yes, shrubberies are my trade. I am a shrubber. My name is Roger the Shrubber. I arrange, design, and sell shrubberies.";

	vm.activeBooths = [
		{booth: "Shrubs", date: "July 10, 2015", time: "10am-2pm"},
		{booth: "More Shrubs", date: "July 21, 2015", time: "4pm-8pm"},
		{booth: "Shrubs III: The reckoning", date: "July 22, 2015", time: "4pm-8pm"},
		{booth: "Shrubs returns: Son of Shrub", date: "July 24, 2015", time: "4pm-8pm"}

	];

	vm.genericProfileImage = $sce.trustAsResourceUrl('../../assets/generic_profile.png');
	vm.genericBannerImage = $sce.trustAsResourceUrl('../../assets/generic_banner.jpg');
	/* END TEST CODE */ 
}]);