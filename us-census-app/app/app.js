'use strict';

var usCensusApp = angular.module('usCensusApp',['ngRoute', 'ngResource',
	'usCensusApp.config', 'usCensusApp.tables', 'usCensusApp.columns', 'usCensusApp.summary'])

usCensusApp.config(function($routeProvider, $locationProvider, $httpProvider, $scope) {

	$scope.api_url = 'http://localhost:9292/api/v0.1/';


	$routeProvider.otherwise({ redirectTo: '/'});

	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

});
