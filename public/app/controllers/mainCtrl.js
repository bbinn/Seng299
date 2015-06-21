angular.module('mainCtrl', [])

vm.studentData = {};
//function to add student to list
vm.addStudent = function() {

    // add a computer to the list
    vm.students.push({
        first: vm.studentData.first,
        last: vm.studentData.last,
    });

    // after our computer has been added, clear the form
    vm.studentData = {};
};