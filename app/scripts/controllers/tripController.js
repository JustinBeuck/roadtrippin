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
            $http.get('http://api.mygasfeed.com/stations/radius/' + latitude + '/' + longitude + '/30/reg/price/8fkb7t88tk.json?')
                .then(
                    function(response) {
                        for (var i = 0; i < 100; i++) {
                            
                        console.log(response.data.stations[i]);
                        
                        // console.log('latitude:', response.data.stations[0].lat);
                        // console.log('longitude:', response.data.stations[0].lng);
                        $scope.$broadcast('add-gas-station', {
                            lat: response.data.stations[i].lat,
                            lng: response.data.stations[i].lng,
                            name: response.data.stations[i].station,
                            address: response.data.stations[i].address,
                            city: response.data.stations[i].city,
                            state: response.data.stations[i].region,
                            zip: response.data.stations[i].zip,
                            reg: response.data.stations[i].reg_price,
                        });
                        };
                        // $scope.addGasStations(response.data.stations[0].lat, response.data.stations[0].lng);

                    });
        }
    }
]);