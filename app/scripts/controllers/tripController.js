'use strict';

// *
//  * @ngdoc function
//  * @name roadtripApp.controller:MainCtrl
//  * @description
//  * # MainCtrl
//  * Controller of the roadtripApp
 

// var roadtrippin = angular.module('roadtrippin',[]);

app.controller('tripController', ['$scope', function($scope) {
		$scope.grabMiles = function (miles) { 
	console.log(miles);
			}
			// console.log(milesPerMarker);
		// $rootScope.grabMileMarkers = function (markers) {
		// 	console.log(markers);
		// }  	
	}
]);