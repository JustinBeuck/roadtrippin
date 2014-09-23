'use strict';

var app = angular.module('roadtrippin', ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/AddVehicle', {
			templateUrl: 'templates/carControllerView.html',
			controller: 'carController'
      }).
      when('/AddAddress', {
			templateUrl: 'templates/addressView.html',
			controller: 'main-ctrl'
      }).
      when('/', {
			templateUrl: 'templates/homeView.html',
			controller: 'HomeCtrl'
      }).
      otherwise({
			redirectTo: '/'
      });
}]);
