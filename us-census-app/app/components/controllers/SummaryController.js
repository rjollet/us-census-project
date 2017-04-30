// SummaryController.js
// Get the summary for the submited column and average

'use strict';

angular.module('usCensusApp.summary', ['ngRoute', 'ngResource', 'usCensusApp.config'])
	.factory('SummaryResource', function($resource, API_URL){
		return $resource(API_URL + 'tables/:table/summary')
	})

.controller('SummaryController', function($scope, SummaryResource) {
		var col_name = [];

		$scope.values = [];
		$scope.rows = [];
		$scope.col_name = [];

		$scope.submit = function (){
			SummaryResource.get(
				{
					table: $scope.table,
					column: $scope.column,
					average: $scope.average
				},
				function(response) {
					$scope.rows = response.rows
					$scope.values = Object.keys($scope.rows[0]);

					col_name = Object.keys($scope.rows[0]);
					if (col_name[2]) {col_name[2] = 'Average ' + col_name[2].split("`")[1]}
					$scope.col_name = col_name
				},
				function(err) {
					$scope.errors = err.data.errors;
				}
			);
		};
});
