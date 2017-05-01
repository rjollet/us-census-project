// SummaryController.js
// Get the summary for the submited column and average

'use strict';

angular.module('usCensusApp.summary', ['ngRoute', 'ngResource', 'usCensusApp.config'])
	.factory('SummaryResource', function($resource, API_URL){
		return $resource(API_URL + 'tables/:table/summary')
	})

.controller('SummaryController', function($scope, SummaryResource) {
		var col_name = [];
		var limit, offset;

		$scope.values = [];
		$scope.rows = [];
		$scope.col_name = [];
		$scope.limit = 10;
		$scope.offset = 0;

		var getSummary = function (table, column, limit, offset, average=null){
			SummaryResource.get(
				{
					table: table,
					column: column,
					average: average,
					limit: limit,
					offset: offset
				},
				function(response) {
					console.log(response);
					$scope.limit = response.limit
					$scope.offset = response.offset
					$scope.total = response.total
					$scope.rows = response.rows
					$scope.values = Object.keys($scope.rows[0]);

					col_name = Object.keys($scope.rows[0]);
					if (average != null) {col_name[2] = 'Average ' + col_name[2].split("`")[1]}
					$scope.col_name = col_name
				},
				function(err) {
					$scope.errors = err.data.errors;
				}
			);
		};

		$scope.submit = function() {
			getSummary($scope.table, $scope.column, $scope.limit, $scope.offset, $scope.average);

			$scope.next = function() {
				if ($scope.offset + $scope.limit < $scope.total) {
					$scope.offset += $scope.limit
				};
			}

			$scope.prev = function() {
				$scope.offset -= $scope.limit;
				if ($scope.offset < 0) { $scope.offset = 0 };
			}
		}
});
