// HomeController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp

'use strict';

angular.module('usCensusApp.tables', ['ngRoute', 'ngResource'])
	.factory('TablesResourse', function($resource){
		return $resource('http://localhost:9292/api/v0.1/tables')
	})

// Routing configuration for this module
.config(['$routeProvider',function($routeprovider){
	$routeprovider.when('/', {
		controller: 'TablesController',
		templateUrl: 'components/views/tablesView.html'
	});
}])

// Controller definition for this module
.controller('TablesController', function($scope,TablesResourse) {
	$scope.tables = [];

	TablesResourse.get(function(response) {
		$scope.tables = response.tables
	})
});
