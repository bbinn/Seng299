// #####  SIMPLE ANGULAR APP  #####

// STEP 2
angular.module('userApp', [])

.controller('mainController', function(){

	var vm = this;

	// basic variable to display
	vm.message ="SENG 299 Angular Tutorial"

	// a list of students that will be displayed on the home page
	vm.students = [
		{first: "David", last: "Johnson"},
		{first: "Ernest", last: "Aaron"}
	];
});


// STEP 7
//  Add this code above the <h1> in main
<!-- form to update the message variable using ng-model -->
<div class="form-group">
    <label>Message</label>
    <input type="text" class="form-control" ng-model="main.message">
</div>



// STEP 8
// Add this below the <h1> in the jumbotron div)
<!-- display the list using ng-repeat -->
<h2>Student List:</h2>
<table class="table table-bordered">
 <thead>
     <tr>
         <th>First Name</th>
         <th>Last Name</th>
     </tr>
 </thead>
 <tbody>
     <tr ng-repeat="student in main.students">
         <td>{{ student.first }}</td>
         <td>{{ student.last }}</td>
     </tr>
 </tbody>
</table>



// STEP 9 (Add below existing list in mainController)

// information that comes from our form
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


// HTML Form
<!-- form to add computer to the list -->
 <form class="form-inline" ng-submit="main.addStudent()">  
     <input type="text" class="form-control" placeholder="First" ng-model="main.studentData.first">
     <input type="text" class="form-control" placeholder="Last" ng-model="main.studentData.last">
     <button type="submit" class="btn btn-success">Add</button>
 </form>




// #####  MEAN STACK ANGULAR APP  #####

 // STEP 1

 angular.module('app.routes', ['ngRoute'])

// Configuring the routes
.config(function($routeProvider, $locationProvider){

	$routeProvider

	// Route for home page
	.when("/", {
		templateUrl: 'app/views/pages/home.html',
		controller: 'mainController',
		controllerAs: 'main'
	});

	// Added to remove the # from URLs
	$locationProvider.html5Mode(true);
});



// STEP 3
angular.module('userService', [])

.factory('User', function($http) {

	// create a new object
	var userFactory = {};

	// get a single user
	userFactory.get = function(id) {
		// since this call requires a user ID we'll add the id to
		// the end of the URL
		return $http.get('/api/users/' + id);
	};

	// get all users
	userFactory.all = function() {
		return $http.get('/api/users/');
	};

	userFactory.create = function(userData){
		// since this is a post method we need to include userData
		// from our form
		return $http.post('/api/users', userData)	
	};
	
	return userFactory;

});


//STEP 6 - User Controller.
angular.module('userCtrl', ['userService'])

.controller('userController', function(User) {

	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;

	// grab all the users at page load
	User.all()
		.success(function(data) {

			// when all the users come back, remove the processing variable
			vm.processing = false;

			// bind the users that come back to vm.users
			vm.users = data;
		});

})


// STEP 7 - add create user controller
.controller('userCreateController', function(User) {
	
	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a user
	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';

		// use the create function in the userService
		User.create(vm.userData)
			.success(function(data) {
				vm.processing = false;
				vm.userData = {};
				vm.message = data.message;
			});
			
	};	

});


// STEP 8 - add function to delete user
// this should be added to the userController since
// deleting a user will occur from the all Users view

	// function to delete a user 
	vm.deleteUser = function(id) {
		vm.processing = true;

		User.delete(id)
			.success(function(data) {

				// get all users to update the table
				// you can also set up your api 
				// to return the list of users with the delete call
				User.all()
					.success(function(data) {
						vm.processing = false;
						vm.users = data;
					});

			});
	};


// STEP 8 HTML - delete button
// add this to the last cell of the user table
<a href="#" ng-click="user.deleteUser(person._id)" class="btn btn-primary">Delete</a>

// STEP 9 - Edit User

//add a new edit user controller
	
	// get the user data for the user you want to edit
	// $routeParams is the way we grab data from the URL
	User.get($routeParams.user_id)
		.success(function(data) {
			vm.userData = data;
		});


// add this to your routes
	// page to edit a user
	.when('/users/:user_id', {
		templateUrl: 'app/views/pages/users/single.html',
		controller: 'userEditController',
		_controllerAs: 'user'
	});
