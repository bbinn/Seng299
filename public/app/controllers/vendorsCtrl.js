angular.module('userApp').controller('VendorController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

  var vm = this;
  vm.searchMessage = "";
  vm.vendorName = "";
  vm.vendorsThisWeek = [];

  $http.post('api/getAccount', {body: JSON.stringify({ accountType: "vendor" })})
  .success(function(data, status, headers, config) {
    var docs = data.docs;
    vm.populateVendorsContainer(docs);
  });

  vm.populateVendorsContainer = function(docs){
    vm.vendorsThisWeek = [];
    for(var i = 0; i < docs.length; i++){
      vm.vendorsThisWeek.push({id: docs[i]._id,  username: docs[i].username, description: docs[i].description, profilePic: docs[i].avatarLink});
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
      vm.populateVendorsContainer(docs);
    });

  }
}]);

splitVendors = function(vendorArray, numPerRow){
  var alteredArray = [];
  for (var i=0; i < vendorArray.length; i+=numPerRow) {
    alteredArray.push(vendorArray.slice(i, i+numPerRow));
  }
  return alteredArray;
}
