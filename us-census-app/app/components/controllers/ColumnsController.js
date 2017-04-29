// AboutController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp

'use strict';

angular.module('usCensusApp.columns', ['ngRoute'])

// Routing configuration for this module
.config(['$routeProvider',function($routeprovider){
	$routeprovider.when('/tables/:table', {
		controller: 'ColumnsController',
		templateUrl: 'components/views/columnsView.html'
	});
}])

// Controller definition for this module
.controller('ColumnsController', function($scope,$http,$timeout,$routeParams) {

		// Global variables for this controller
		var responseStatus = '';
		var table = $routeParams.table;
		var columns = [];

		// Just a housekeeping.
		// In the init method we are declaring all the
		// neccesarry settings and assignments to be run once
		// controller is invoked
		init();

		function init(){};

		// Get requestors IP address from httpbin.org
		function loadColumns(){

			// Before serving login page we are doing example http request
			// to web API to verify if login service is up and running.
			// Using httpbin.org as mock in this case - it returns requestors IP address
			console.log($routeParams);
			var url = 'http://localhost:9292/api/v0.1/tables/' + table;
			return $http.get(url).
		  		then(function(response) {
		    	// this callback will be called asynchronously
		    	// when the response is available
		    	responseStatus = response.status;
					$scope.table = table;
					$scope.columns = response.data.columns;
		    	console.log(JSON.stringify(response.data));

		    	// assigning tables to scope
		    	return $scope;

		    }, function(errorResponse) {
		    	// called asynchronously if an error occurs
		    	// or server returns response with an error status.
		    	responseStatus = errorResponse.status;
		    	console.log(JSON.stringify(errorResponse));

		    	// assigning tables to scope
		    	return $scope.tables = tables;
		    });

		};

		loadColumns();

}).controller('SummaryController', function($scope) {

		// Global variables for this controller
		var responseStatus = '';
		var rows = [];

		// Just a housekeeping.
		// In the init method we are declaring all the
		// neccesarry settings and assignments to be run once
		// controller is invoked
		init();

		function init(){};

		// Get requestors IP address from httpbin.org
		function loadSummary(){

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
					$scope.table = $routeParams.table;
					$scope.column = $routeParams.column;
					$scope.rows = rows;
		    	console.log(JSON.stringify(response.data));

		    	// assigning tables to scope
		    	return $scope;

		    }, function(errorResponse) {
		    	// called asynchronously if an error occurs
		    	// or server returns response with an error status.
		    	responseStatus = errorResponse.status;
		    	console.log(JSON.stringify(errorResponse));

		    	// assigning tables to scope
		    	return $scope.tables = tables;
		    });

		};

		$scope.submit = loadSummary()
});;
