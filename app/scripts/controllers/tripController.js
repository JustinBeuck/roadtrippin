'use strict';

// *
//  * @ngdoc function
//  * @name roadtripApp.controller:MainCtrl
//  * @description
//  * # MainCtrl
//  * Controller of the roadtripApp
 

// var roadtrippin = angular.module('roadtrippin',[]);

app.controller('tripController', ['$scope', function ($scope) {

		$scope.grabMiles = function (miles) { 
			$scope.milesToEmpty = miles
			console.log(miles);
		};
		$scope.updateMilesPerMarker = function(milesPerMarker) {
			$scope.milesPerMarker = milesPerMarker;
			// console.log('debuggggggg')
			// console.log($scope.milesPerMarker);
			// console.log(Math.floor($scope.milesToEmpty / $scope.milesPerMarker));	
			// $scope.num = Math.floor($scope.milesToEmpty / $scope.milesPerMarker); 
		// $scope.$parent.gasLocation($scope.num);
			$scope.gasLocation();
		}
		$scope.gasLocation = function () {
			$scope.num = Math.floor($scope.milesToEmpty / $scope.milesPerMarker);
			console.log($scope.num)
			// $scope.$parent.$parent.findFuel($scope.num);
		}
	}
]);