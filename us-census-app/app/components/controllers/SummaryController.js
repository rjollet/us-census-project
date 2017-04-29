// HomeController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp

'use strict';

angular.module('usCensusApp.summary', ['ngRoute'])

// Controller definition for this module
.controller('SummaryController', function($scope, $http) {

		// Global variables for this controller
		var responseStatus = '';
		var col_name = '';
		var rows = [];

		// Just a housekeeping.
		// In the init method we are declaring all the
		// neccesarry settings and assignments to be run once
		// controller is invoked
		init();

		function init(){};

		// Get requestors IP address from httpbin.org
		$scope.submit = function (){

			// Before serving login page we are doing example http request
			// to web API to verify if login service is up and running.
			// Using httpbin.org as mock in this case - it returns requestors IP address
			console.log($scope);
			var url = 'http://localhost:9292/api/v0.1/tables/' + $scope.table
			url = url + '/summary?column=' + $scope.column;
			if ($scope.average) url = url + '&average=' + $scope.average
			return $http.get(url).
		  		then(function(response) {
		    	// this callback will be called asynchronously
		    	// when the response is available
		    	responseStatus = response.status;
					rows = response.data.rows;
					$scope.values = Object.keys(rows[0]);
					col_name = Object.keys(rows[0]);
					if (col_name[2]) {col_name[2] = 'Average ' + col_name[2].split("`")[1]}
					$scope.rows = rows;
					$scope.col_name = col_name;
		    	console.log(JSON.stringify(response.data));

		    	// assigning tables to scope
		    	return $scope;

		    }, function(errorResponse) {
		    	// called asynchronously if an error occurs
		    	// or server returns response with an error status.
		    	responseStatus = errorResponse.status;
		    	console.log(JSON.stringify(errorResponse));

		    	// assigning tables to scope
		    	return $scope.rows = rows;
		    });

		};
});
