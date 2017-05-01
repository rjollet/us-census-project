'use strict';

var usCensusApp = angular.module('usCensusApp',['ngRoute', 'ngResource',
	'usCensusApp.config', 'usCensusApp.tables', 'usCensusApp.columns', 'usCensusApp.summary'])

usCensusApp.config(function($routeProvider, $locationProvider, $httpProvider) {

	$routeProvider.otherwise({ redirectTo: '/'});

	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

});
