angular.module('userApp').controller('VendorController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

  var vm = this;
  vm.searchMessage = "";
  vm.vendorName = "";
  vm.vendors = [];
  vm.header = "All Vendors"

  var today = new Date();
  vm.date = new Date(today.getYear(), today.getMonth(), today.getDay(), 0, 0, 0, 0);

  console.log(vm.date.getYear());
  console.log(vm.date.getMonth());
  console.log(vm.date.getDay());
  console.log(today.getDay());

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
  $http.post('api/getAccount', {body: JSON.stringify({ accountType: "vendor" })})
  .success(function(data, status, headers, config) {
    var docs = data.docs;
    vm.populateVendors(docs);
    vm.vendorSort(0);
  });

  vm.populateVendors = function(docs){
    vm.vendors = [];
    for(var i = 0; i < docs.length; i++){
      vm.vendors.push({id: docs[i]._id,  username: docs[i].username, description: docs[i].description, profilePic: docs[i].avatarLink});
    }
  }

  vm.viewProfile = function(id) {
    document.location.href = "http://localhost:8080/account/" + id;
  }
  vm.search = function(){
    console.log("you just searched: " + vm.vendorName);

    $http.post('api/getAccount', {body: JSON.stringify({ accountType: "vendor", fuzzyName: vm.vendorName  })})
    .success(function(data, status, headers, config) {
      var docs = data.docs;
      vm.populateVendors(docs);
    });
  }

  vm.filterVendors = function(type){

    if(type.id == 0) {
      vm.header = "All Vendors"
      $http.post('api/getAccount', {body: JSON.stringify({ accountType: "vendor" })})
      .success(function(data, status, headers, config) {
        var docs = data.docs;
        vm.populateVendors(docs);
        vm.vendorSort(0);
      });
    }
    else if(type.id == 1) {
      vm.header = "This Week's Vendors"
      $http.post('api/getbooths', {body: JSON.stringify({ timeSlot: vm.date })})
      .success(function (data, status, xhr, config) {
        var docs = data.docs;
        vm.populateVendors(docs);
      });
    }
    else if(type.id == 2) {
      vm.header = "Top Followed Vendors"
    }

  }
  vm.vendorSort = function(type){

    //alphabetically sort vendors list
    if(type == 0) {
      vm.vendors.sort(function(a, b){
        var aUsername = a.username.toLowerCase();
        var bUsername = b.username.toLowerCase();
        if(aUsername < bUsername) return -1;
        if(aUsername > bUsername) return 1;
        return 0;
      });
    }
  }

}]);
