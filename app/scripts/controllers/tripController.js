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
            // console.log(miles);
        };

        $scope.updateMilesPerMarker = function(milesPerMarker) {
            $scope.milesPerMarker = milesPerMarker;

            $scope.gasLocation();
        }

        $scope.gasLocation = function() {
            $scope.num = Math.floor($scope.milesToEmpty / $scope.milesPerMarker);
            // console.log($scope.num)
            // $scope.$parent.$parent.findFuel($scope.num);
        }

        $scope.gasStations = function(longitude, latitude) {
            $http.get('http://www.devapi.mygasfeed.com/stations/radius/' + latitude + '/' + longitude + '/20/reg/price/rfej9napna.json?')
                .then(
                    function(response) {
                        console.log(response.data.stations[0]);
                        // console.log('latitude:', response.data.stations[0].lat);
                        // console.log('longitude:', response.data.stations[0].lng);
                        $scope.$broadcast('add-gas-station', {
                            lat: response.data.stations[0].lat,
                            lng: response.data.stations[0].lng
                        });
                        // $scope.addGasStations(response.data.stations[0].lat, response.data.stations[0].lng);

                    });
        }
    }
]);