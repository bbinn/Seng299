angular.module('userApp').controller('VendorController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

  var vm = this;
  vm.searchMessage = "";
  vm.searchVendorName = "";
  vm.clickedVendor = -1;

// temp dummy vendors
  vm.vendorsThisWeek = [
    { id: 0, userName: "Mr.Banana", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/mrBanana.jpg')},
    { id: 1, userName: "EggsGalore", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/eggsGalore.jpg')},
    { id: 2, userName: "GotMilk?", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/cowsMilk.jpg')},
    { id: 3, userName: "Wooly's Wool", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/wooliesWool.jpg')},
    { id: 4, userName: "Eatza Pizza", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/pizza.jpg')},
    { id: 5, userName: "Saul's Sandwiches", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/tonysSandwiches.jpg')},
    { id: 6, userName: "Butcher Bob", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/butcherBob.jpg')},
    { id: 7, userName: "Atoms Apples", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/atomsApples.jpg')},
    { id: 8, userName: "Uncle Joe's BBQ", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/uncleJoe.jpg')},
    { id: 9, userName: "A little Fishy", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/fishy.jpg')},
    { id: 10, userName: "Rena's Pies", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/renasPies.jpg')},
    { id: 11, userName: "Philip's Pumkins", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/pumpkins.jpg')},
    { id: 12, userName: "Peter's Produce", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/produce.jpg')},
  ];
  vm.vendorsThisWeek = splitVendors(vm.vendorsThisWeek, 5);

  vm.vendorsMostFollowed = [
    { id: 6, userName: "Butcher Bob", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/butcherBob.jpg')},
    { id: 2, userName: "GotMilk?", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/cowsMilk.jpg')},
    { id: 5, userName: "Saul's Sandwiches", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/tonysSandwiches.jpg')},
    { id: 8, userName: "Uncle Joe's BBQ", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/uncleJoe.jpg')},
    { id: 9, userName: "A little Fishy", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/fishy.jpg')},
    { id: 10, userName: "Rena's Pies", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/renasPies.jpg')},
  ];
  vm.vendorsMostFollowed = splitVendors(vm.vendorsMostFollowed, 4);

// end temp dummy vendors

  vm.searchVendor = function(searchVendorName) {
    vm.searchMessage = "You just searched: " + searchVendorName;
  }

  vm.vendorClicked = function(id) {
    vm.clickedVendor= id;
  }

}]);

splitVendors = function(vendorArray, numPerRow){
  var alteredArray = [];
  for (var i=0; i < vendorArray.length; i+=numPerRow) {
    alteredArray.push(vendorArray.slice(i, i+numPerRow));
  }
  return alteredArray;
}