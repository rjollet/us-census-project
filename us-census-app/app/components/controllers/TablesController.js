// TablesController.js
// Get the list of tables in the database

'use strict';

angular.module('usCensusApp.tables', ['ngRoute', 'ngResource', 'usCensusApp.config'])
	.factory('TablesResource', function($resource, API_URL){
		return $resource(API_URL + 'tables')
	})

.config(['$routeProvider',function($routeprovider){
	$routeprovider.when('/', {
		controller: 'TablesController',
		templateUrl: 'components/views/tablesView.html'
	});
}])

.controller('TablesController', function($scope,TablesResource) {
	$scope.tables = [];

	TablesResource.get(
		function(response) {
			$scope.tables = response.tables
		},
		function(err) {
			$scope.errors = err.data.errors;
		}
	);
});
