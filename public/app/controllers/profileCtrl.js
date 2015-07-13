var currentBooth = null;

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
  vm.avatarLink = $sce.trustAsResourceUrl('../../assets/images/generic_profile.png');
  vm.description = "This user has not provided a description.";

  vm.followers = [];
  vm.following = [];

  vm.getAccount = function(curr_user_id) {
    $http.post('api/getaccount', {body: JSON.stringify({ vendorId: curr_user_id})})
    .success(function(data, status, headers, config) {
      vm.name = data.docs[0].name;
      vm.username = data.docs[0].username;
      vm.company = data.docs[0].company;
      vm.age = data.docs[0].age;
      vm.email = data.docs[0].email;
      vm.address = data.docs[0].address;
      vm.phone = data.docs[0].phone;
      vm.avatarLink = data.docs[0].avatarLink;
      vm.bannerLink = data.docs[0].bannerLink;
      vm._id = data.docs[0]._id;

      if (typeof data.docs[0].description !== "undefined") {
        vm.description = data.docs[0].description;
      }
      // user has the ability to book booths
      if (data.docs[0].accountType === "vendor" || data.docs[0].accountType === "admin") {
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
      var today = new Date();
      for (var i = 0; i < docs.length; i++) {
        dt = new Date(docs[i].timeSlot);
        if (dt >= today) {
          boothDate = vm.m_names[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();
          vm.activeBooths.push({
            title: docs[i].title,
            boothType: docs[i].boothType,
            timeSlot: boothDate,
            description: docs[i].description,
            boothNumber: docs[i].boothNumber,
            vendorId: vm.userID
          });
        }
      }
      if (data.docs.length > 0) {
        vm.hasBooths = true;
      }

      vm.activeBooths.sort(function(a, b) {
        var date1 = new Date(a.timeSlot);
        var date2 = new Date(b.timeSlot);
        return date1 - date2;
      });
    });
  };

  vm.boothDescriptionDialog = function(booth){
    currentBooth = booth;

    ngDialog.openConfirm({
      template: 'app/views/pages/popup/ViewBoothPopup.html',
      scope: $scope,
      controller: 'BoothPopupController'
    }).then(
      function() {
        vm.unbookBoothDialog(booth);
      },
      function() {
        //do nothing
      }
    )
  };

  vm.unbookBoothDialog = function(booth) {
    // console.log(booth);
    // console.log(new Date(booth.timeSlot));
    ngDialog.openConfirm({
      template: 'app/views/pages/popup/unbookConfirm.html'
    }).then(
      function() {
        $http.post('api/unbook', {body: JSON.stringify({
          timeSlot: new Date(booth.timeSlot),
          boothNumber: booth.boothNumber,
          boothType: booth.boothType,
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
    if (!activeUser) {
      return;
    }
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
    var template = "<h1> Followers </h1><br>";
    var followerids = [];
    for (var i = 0; i < vm.followers.length; i++) {
      followerids[i] = vm.followers[i].userId;
    }

    $http.post('api/getaccount', {body: JSON.stringify({ids: followerids})})
    .success(function(data, status, xhr, config) {
      for (var i = 0; i < vm.followers.length; i++) {
        template += "<p>" + data.docs[i].name + "</p><br>";
      }
      ngDialog.open({
        template: template,
        plain: true
      });
    });
  };

  vm.showFollowing = function() {
    var template = "<h1> Following </h1><br>";
    var followingids = [];
    for (var i = 0; i < vm.following.length; i++) {
      followingids[i] = vm.following[i].vendorId;
    }

    $http.post('api/getaccount', {body: JSON.stringify({ids: followingids})})
    .success(function(data, status, xhr, config) {
      for (var i = 0; i < vm.following.length; i++) {
        template += "<p>" + data.docs[i].name + "</p><br>";
      }
      ngDialog.open({
        template: template,
        plain: true
      });
    });
  };

  vm.isFollowing = function() {
    if (!activeUser) {
      return false;
    }
    for (var i = 0; i < vm.followers.length; i++) {
      if (vm.followers[i].userId == activeUser._id) {
        return true;
      }
    }
    return false;
  };

  var user;

  vm.userID = $routeParams.user_id;

  if (typeof vm.userID === 'undefined') {
    if (activeUser != null) {
      vm.userID = activeUser._id;
    }  else {
      vm.userID = null
    }
  }

  if (vm.userID == null) {
    vm.name = null;
    vm.avatarLink = null;
    vm.bannerLink = null;
    vm.description = null;
  } else {
    vm.getAccount(vm.userID);
  }
  vm.getActiveBooths(vm.userID);
  vm.repopulateFollowers();

}]);

angular.module('userApp').controller('profileEditController', ['$scope', '$http', function($scope, $http) {

  var vm = this;

  vm.edits = {
    NAME: 0,
    COMPANY: 1,
    AGE: 2,
    EMAIL: 3,
    ADDRESS: 4,
    PHONE: 5
  }

  vm.editName = false;
  vm.editCompany = false;
  vm.editAge = false;
  vm.editEmail = false;
  vm.editAddress = false;
  vm.editPhone = false;

  vm.toggleEdit = function(field, editType) {
    var temp = field;
    if (temp == false) {
      temp = true;
    } else {
      temp = false;
    }

    switch (editType) {
      case vm.edits.NAME:
        vm.editName = temp;
        break;
      case vm.edits.COMPANY:
        vm.editCompany = temp;
        break;
      case vm.edits.AGE:
        vm.editAge = temp;
        break;
      case vm.edits.EMAIL:
        vm.editEmail = temp;
        break;
      case vm.edits.ADDRESS:
        vm.editAddress = temp;
        break;
      case vm.edits.PHONE:
        vm.editPhone = temp;
        break;
      default:
        break;
    }
  }

  vm.saveEdit = function(field, editType, curr_user_id) {

    var new_value;

    switch (editType) {
      case vm.edits.NAME:
        new_value = document.getElementById('nameEdit').value.trim();
        $http.post('api/changeaccount', {body: JSON.stringify({vendorId: curr_user_id, name: new_value})})
          .success(function(data, status, headers, config) {
        });
        break;
      case vm.edits.COMPANY:
        new_value = document.getElementById('companyEdit').value.trim();
        $http.post('api/changeaccount', {body: JSON.stringify({vendorId: curr_user_id, company: new_value})})
          .success(function(data, status, headers, config) {
        });
        break;
      case vm.edits.AGE:
        new_value = document.getElementById('ageEdit').value.trim();
        $http.post('api/changeaccount', {body: JSON.stringify({vendorId: curr_user_id, age: new_value})})
          .success(function(data, status, headers, config) {
        });
        break;
      case vm.edits.EMAIL:
        new_value = document.getElementById('emailEdit').value.trim();
        if(!ClientUtils.validateEmail(new_value)){
           return angular.element(document.getElementById('alertController')).scope().alert.showAlert('Please enter a valid email');
        }
        $http.post('api/changeaccount', {body: JSON.stringify({vendorId: curr_user_id, email: new_value})})
          .success(function(data, status, headers, config) {
        });
        break;
      case vm.edits.ADDRESS:
        new_value = document.getElementById('addressEdit').value.trim();
        $http.post('api/changeaccount', {body: JSON.stringify({vendorId: curr_user_id, address: new_value})})
          .success(function(data, status, headers, config) {
        });
        break;
      case vm.edits.PHONE:
        new_value = document.getElementById('phoneEdit').value.trim();
        $http.post('api/changeaccount', {body: JSON.stringify({vendorId: curr_user_id, phone: new_value})})
          .success(function(data, status, headers, config) {
        });
        break;
      default:
        break;
    }

    vm.toggleEdit(field, editType);
  }
}]);
