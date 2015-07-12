angular.module('userApp').controller('VendorController', ['$scope', '$http', '$sce', '$location', function($scope, $http, $sce, $location) {

  var vm = this;
  vm.searchMessage = "";
  vm.vendorName = "";
  vm.vendors = [];
  vm.header = "All Vendors"
  vm.noVendors = false;
  vm.noVendorsImg = $sce.trustAsResourceUrl('../../assets/images/sadCat.jpg');
  vm.defaultAvatarLink = $sce.trustAsResourceUrl('../../assets/images/generic_profile.png');

  var today = new Date();
  var date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
  var maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);


  vm.filterTypes = [{
    id: 0,
    name: "All Vendors",
  }, {
    id: 1,
    name: "This Week's Vendors",
  }, {
    id: 2,
    name: "Top Followed Vendors",
  }];

  //Initialize all vendors in the vendor container.
  $http.post('api/getAccount', {body: JSON.stringify( {$or:[{accountType: "admin"}, {accountType: "vendor" }]})})
  .success(function(data, status, headers, config) {
    var docs = data.docs;

    if(docs.length == 0)
    {
      vm.noVendors = true;
      vm.vendors = [];
    }
    else
    {
      vm.populateVendors(docs);
      vm.noVendors = false;
    }
    vm.populateVendors(docs);
    vm.vendorSort(0);
  });


  vm.populateVendors = function(docs){
    vm.vendors = [];
    var avatarLink;
    for(var i = 0; i < docs.length; i++){
      if (typeof docs[i].avatarLink == "undefined") {
        avatarLink = vm.defaultAvatarLink;
      } else {
        avatarLink = docs[i].avatarLink;
      }
      vm.vendors.push({id: docs[i]._id,  name: docs[i].name, description: docs[i].description, profilePic: avatarLink, numFollowers: docs[i].numFollowers});
    }
  }

  vm.viewProfile = function(id) {
    $location.path("/account/" + id);
  }
  vm.search = function(){
    $http.post('api/getAccount', {body: JSON.stringify({$or:[{accountType: "vendor", accountType: "admin"}] , fuzzyName: vm.vendorName })})
    .success(function(data, status, headers, config) {
      var docs = data.docs;
      if(docs.length == 0)
      {
        vm.noVendors = true;
        vm.vendors = [];
      }
      else
      {
        vm.populateVendors(docs);
        vm.noVendors = false;
      }

    });
  }

  vm.filterVendors = function(type){
    if(type == null)
      return;

    vm.vendors = [];
    if(type.id == 0) {
      vm.header = "All Vendors";
      $http.post('api/getAccount', {body: JSON.stringify({$or:[{accountType: "admin"}, {accountType: "vendor" }]})})
      .success(function(data, status, headers, config) {
        var docs = data.docs;
        vm.populateVendors(docs);
        vm.vendorSort(0);
      });
    }
    else if(type.id == 1) {
      vm.header = "This Week's Vendors";
      vm.vendors = [];

      maxDate.setDate(maxDate.getDate() + 7);

      $http.post('api/getbooths', {body: JSON.stringify({ timeRangeMin: date, timeRangeMax: maxDate})})
      .success(function (data, status, xhr, config) {
        var docs = data.docs;
        var vendorsids = [];

        for(var i = 0; i < docs.length; i++){
          vendorsids.push(docs[i].vendorId);
        }
        $http.post('api/getAccount', {body: JSON.stringify({ ids: vendorsids })})
        .success(function (data, status, xhr, config) {
          var docs = data.docs;
          vm.populateVendors(docs);
        });
      });
    }
    else if(type.id == 2) {
      vm.header = "Top Followed Vendors";
      $http.post('api/topfollowers')
      .success(function(data, status, xhr, config) {
        vm.populateVendors(data.docs);
      });


    }
  }
  vm.vendorSort = function(type){
    //alphabetically sort vendors list
    if(type == 0) {
      vm.vendors.sort(function(a, b){
        var aUsername = a.name.toLowerCase();
        var bUsername = b.name.toLowerCase();
        if(aUsername < bUsername) {
          return -1;
        }
        if(aUsername > bUsername) {
          return 1;
        }
        return 0;
      });
    }
  }

}]);
