'use strict';

// *
//  * @ngdoc function
//  * @name roadtripApp.controller:MainCtrl
//  * @description
//  * # MainCtrl
//  * Controller of the roadtripApp


// var roadtrippin = angular.module('roadtrippin',[]);

app.controller('tripController', ['$scope', '$http',
    function($scope, $http) {

        $scope.grabMiles = function(miles) {
            $scope.milesToEmpty = miles
            console.log(miles);
        };

        $scope.updateMilesPerMarker = function(milesPerMarker) {
            $scope.milesPerMarker = milesPerMarker;

            $scope.gasLocation();
        }

        $scope.gasLocation = function() {
            $scope.num = Math.floor($scope.milesToEmpty / $scope.milesPerMarker);
            $scope.gasStations();
            console.log($scope.num)
            // $scope.$parent.$parent.findFuel($scope.num);
        }

        $scope.gasStations = function(long, lat) {
            $http.get('http://www.devapi.mygasfeed.com/stations/radius/' + long + '/' + lat + '/20/reg/price/rfej9napna.json?')
                .then(
                    function(response) {
                        console.log(response);
                    });
        }
    }
]);