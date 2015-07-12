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

	vm.followers = [];
	vm.following = [];

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
      template: 'app/views/pages/popup/unbookConfirm.html'
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

	vm.repopulateFollowers = function() {
		vm.followers.length = 0;
		$http.post('api/getfollowers', {body: JSON.stringify({username: vm.userID})})
		.success(function(data, status, xhr, config) {
			for(var i = 0; i < data.docs.length; i++) {
				vm.followers[i] = data.docs[i];
			}
		});
		vm.following.length = 0;
		$http.post('api/getfollowing', {body: JSON.stringify({username: vm.userID})})
                .success(function(data, status, xhr, config) {
                        for(var i = 0; i < data.docs.length; i++) {
                                vm.following[i] = data.docs[i];
                        }
                });
	};

	vm.follow = function() {
		$http.post('api/follow', {body: JSON.stringify({username: activeUser._id, vendor: vm.userID})})
                .success(function(data, status, xhr, config) {
			vm.repopulateFollowers();
                });
	};

	vm.unfollow = function() {
		$http.post('api/unfollow', {body: JSON.stringify({username: activeUser._id, vendor: vm.userID})})
		.success(function(data, status, xhr, config) {
			vm.repopulateFollowers();
		});
	};

	vm.showFollowers = function() {
		vm.repopulateFollowers();
	};

	vm.showFollowing = function() {
		vm.repopulateFollowers();
	};

	vm.isFollowing = function() {
		console.log("checking");
		console.log(vm.followers);
		for (var i = 0; i < vm.followers.length; i++) {
			console.log("Checking " + vm.followers[i] + " " + activeUser._id);
			if (vm.followers[i].userId == activeUser._id) {
				return true;
			}
		}
		return false;
	};

	var user;

	vm.userID = $routeParams.user_id;

	if (typeof vm.userID === 'undefined') {
		vm.userID = activeUser._id;
	}

	vm.getAccount(vm.userID);
	vm.getActiveBooths(vm.userID);
	vm.repopulateFollowers();

}
]);
