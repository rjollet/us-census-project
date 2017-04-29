// HomeController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp

'use strict';

angular.module('usCensusApp.tables', ['ngRoute'])

// Routing configuration for this module
.config(['$routeProvider',function($routeprovider){
	$routeprovider.when('/', {
		controller: 'TablesController',
		templateUrl: 'components/views/tablesView.html'
	});
}])

// Controller definition for this module
.controller('TablesController', function($scope,$http) {

		// Global variables for this controller
		var responseStatus = '';
		var tables = [];

		// Just a housekeeping.
		// In the init method we are declaring all the
		// neccesarry settings and assignments to be run once
		// controller is invoked
		init();

		function init(){};

		// Get requestors IP address from httpbin.org
		function loadTables(){

			// Before serving login page we are doing example http request
			// to web API to verify if login service is up and running.
			// Using httpbin.org as mock in this case - it returns requestors IP address

			var url = 'http://localhost:9292/api/v0.1/tables/';
			return $http.get(url).
		  		then(function(response) {
		    	// this callback will be called asynchronously
		    	// when the response is available
		    	responseStatus = response.status;
		    	tables = response.data.tables;
		    	console.log(tables);
		    	console.log(JSON.stringify(response.data));

		    	// assigning tables to scope
		    	return $scope.tables = tables;

		    }, function(errorResponse) {
		    	// called asynchronously if an error occurs
		    	// or server returns response with an error status.
		    	responseStatus = errorResponse.status;
		    	console.log(JSON.stringify(errorResponse));

		    	// assigning tables to scope
		    	return $scope.tables = tables;
		    });

		};

		loadTables();
});
