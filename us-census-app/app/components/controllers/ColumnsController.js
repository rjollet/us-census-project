// AboutController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp

'use strict';

angular.module('usCensusApp.columns', ['ngRoute', 'ngResource'])
	.factory('ColumnsResourse', function($resource){
		return $resource('http://localhost:9292/api/v0.1/tables/:table')
	})

// Routing configuration for this module
.config(['$routeProvider',function($routeprovider){
	$routeprovider.when('/tables/:table', {
		controller: 'ColumnsController',
		templateUrl: 'components/views/columnsView.html'
	});
}])

// Controller definition for this module
.controller('ColumnsController', function($scope, $routeParams, ColumnsResourse) {

		$scope.table = $routeParams.table;
		$scope.columns = [];

		ColumnsResourse.get({table: $scope.table}, function(response) {
			$scope.columns = response.columns;
		});

});
