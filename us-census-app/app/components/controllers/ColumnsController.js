// ColumnsController.js
// Get the list of columns in the selected table

'use strict';

angular.module('usCensusApp.columns', ['ngRoute', 'ngResource', 'usCensusApp.config'])
	.factory('ColumnsResource', function($resource, API_URL){
		return $resource(API_URL + 'tables/:table')
	})

.config(['$routeProvider',function($routeprovider){
	$routeprovider.when('/tables/:table', {
		controller: 'ColumnsController',
		templateUrl: 'components/views/columnsView.html'
	});
}])

.controller('ColumnsController', function($scope, $routeParams, ColumnsResource) {
	$scope.table = $routeParams.table;
	$scope.columns = [];
	$scope.errors = [];

	ColumnsResource.get({table: $scope.table},
		function(response) {
			$scope.columns = response.columns;
		},
		function(err) {
			$scope.errors = err.data.errors;
		}
	);
});
