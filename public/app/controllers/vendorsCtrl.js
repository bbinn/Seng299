angular.module('userApp').controller('VendorController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

  var vm = this;
  vm.searchMessage = "";
  vm.searchVendorName = "";

  // $http.post('api/getAccounts', {body: JSON.stringify({ })})
  // .success(function (data, status, xhr, config) {

// temp dummy vendors
  vm.vendorsThisWeek = [
    { id: 0, description: "My Banana's are the fucking best. Especiially if you don't buy organic! ;Paaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", userName: "Mr.Banana", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/mrBanana.jpg')},
    { id: 1, description: "bock,bock,bock,bock,bock,begowwwwk", userName: "EggsGalore", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/eggsGalore.jpg')},
    { id: 2, description: "Got enough calcium?", userName: "GotMilk?", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/cowsMilk.jpg')},
    { id: 3, description: "Get your clothing material here!", userName: "Wooly's Wool", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/wooliesWool.jpg')},
    { id: 4, description: "So GREASY but so GOOD!", userName: "Eatza Pizza", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/pizza.jpg')},
    { id: 5, description: "You name it you get it. (style your own sandwich!)", userName: "Saul's Sandwiches", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/tonysSandwiches.jpg')},
    { id: 6, description: "Don't worry I cleaned most of the blood off", userName: "Butcher Bob", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/butcherBob.jpg')},
    { id: 7, description: "Males and Females Welcome to Atom's Apple. (red and green apples available)", userName: "Atoms Apples", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/atomsApples.jpg')},
    { id: 8, description: "mmm... BBQ...", userName: "Uncle Joe's BBQ", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/uncleJoe.jpg')},
    { id: 9, description: "Varies in shapes and sizes", userName: "A little Fishy", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/fishy.jpg')},
    { id: 10, description: "Fuck your Mom's pies, mine are better!", userName: "Rena's Pies", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/renasPies.jpg')},
    { id: 11, description: "jack-o-lantern time! kids come quick hehe", userName: "Philip's Pumkins", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/pumpkins.jpg')},
    { id: 12, description: "just your average run of the mill produce", userName: "Peter's Produce", profilePic: $sce.trustAsResourceUrl('../../assets/images/vendorsTemp/produce.jpg')},
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

  vm.viewProfile = function(id) {
    alert("you want to view vendor id: " + id);
  }
  vm.search = function(){


  }


}]);

splitVendors = function(vendorArray, numPerRow){
  var alteredArray = [];
  for (var i=0; i < vendorArray.length; i+=numPerRow) {
    alteredArray.push(vendorArray.slice(i, i+numPerRow));
  }
  return alteredArray;
}
