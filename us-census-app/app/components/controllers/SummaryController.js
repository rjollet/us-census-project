// HomeController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp

'use strict';

angular.module('usCensusApp.summary', ['ngRoute', 'ngResource'])
	.factory('SummaryResourse', function($resource){
		return $resource('http://localhost:9292/api/v0.1/tables/:table/summary')
	})


// Controller definition for this module
.controller('SummaryController', function($scope, SummaryResourse) {

		var col_name = [];

		$scope.values = [];
		$scope.rows = [];
		$scope.col_name = [];

		$scope.submit = function (){

			SummaryResourse.get({
				table: $scope.table,
				column: $scope.column,
				average: $scope.average
			}, function(response) {
				$scope.rows = response.rows
				$scope.values = Object.keys($scope.rows[0]);

				col_name = Object.keys($scope.rows[0]);
				if (col_name[2]) {col_name[2] = 'Average ' + col_name[2].split("`")[1]}
				$scope.col_name = col_name
			});
		};
});
