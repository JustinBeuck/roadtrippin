 // var app = angular.module('app',[]);

// app.controller('tripController', ['$scope', function($scope) {
//     $scope.milesPerMarker;
//     console.log($scope.milesPerMarker);
// }])

app.directive('map', function() {
    'use strict';

    var directionsDisplay = new google.maps.DirectionsRenderer(),
        directionsService = new google.maps.DirectionsService(),
        geocoder = new google.maps.Geocoder(),
        map,
        marker,
        mapObj,
        markerArray = [],
        infowindow;

    mapObj = {

        restrict: 'EAC',
        transclude: true,
        scope: {
            destination: '@',
            markerContent: '@',
            zoom: '=',
            type: '@',
            directions: '@'
        },
        replace: true,
        template: '<form novalidate name="mapContainer" class="mapContainer panel">' +
        '<div class="directions" ng-show="directions || directions==undefined">' +
            '<label>Origin:</label>' + '<br />' +
            '<input type="text" ng-model="origin" name="origin"  required>' +
            '<small class="error" id="wrongAddress">Error: \n ' +
            '<span>Sorry this is not a valid address.</span>' +
            '</small>' + '<br />' +
            '<label>Destination:</label>' + '<br />' +
            '<input ng-model="endPoint" type="text" name="Destination" required>' + '<br />' + '<br />' +
            '<button class="getDirections" ng-click="getDirections()" ng-disabled="mapContainer.$invalid">Get Directions</button> ' +
            '<button class="clearDirections alert" ng-click="clearDirections()" ng-disabled="mapContainer.$invalid">Clear</button>' +
            '</div>' +
            '<div id="theMap"></div>' +
            '</form>', // todo: use template url and template file
        link: function(scope, element, attrs) {
            console.log("working!!!!!!!!!!!");
            scope.init = function() {
                var mapOptions = {
                    zoom: scope.zoom !== undefined ? scope.zoom : 16,
                    mapTypeId: scope.type.toLowerCase(),
                    streetViewControl: false
                };
                map = new google.maps.Map(document.getElementById('theMap'), mapOptions);
                scope.endPoint = scope.destination !== undefined ? scope.destination : '716 Congress Ave #100, Austin, TX 78701';

                geocoder.geocode({
                    address: scope.endPoint
                }, function(results, status) {
                    var location = results[0].geometry.location;
                    if (status === google.maps.GeocoderStatus.OK) {
                        map.setCenter(location);
                        marker = new google.maps.Marker({
                            map: map,
                            position: location,
                            animation: google.maps.Animation.DROP
                        });
                        infowindow = new google.maps.InfoWindow({
                            content: scope.markerContent !== undefined ? scope.markerContent : 'Google HQ'
                        });
                        google.maps.event.addListener(marker, 'click', function() {
                            return infowindow.open(map, marker);
                        });

                    } else {
                        alert('Cannot Geocode');
                    }

                });


            };

            scope.init();

            scope.getDirections = function() {


                var request = {
                    origin: scope.origin,
                    destination: scope.endPoint,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };
                directionsService.route(request, function(response, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        // console.log((response.routes[0].legs[0].distance.value * 0.00062137)/scope.myFuelRange.overview_path.length);
                        
                        scope.mileDistance = response.routes[0].legs[0].distance.text;
                        console.log(scope.mileDistance);
                        scope.showSteps(response);
                        document.getElementById('wrongAddress').style.display = "none";
                    } else {
                        document.getElementById('wrongAddress').style.display = "block";
                    }
                });
                directionsDisplay.setMap(map);

                directionsDisplay.setPanel(document.getElementById('directionsList'));
                    // scope.showSteps(response);

            };

            scope.showSteps = function(directionResult) {
              // var myRoute = directionResult.routes[0].legs[0];
              var myFuelRange = directionResult.routes[0];
               scope.milesPerMarker = (directionResult.routes[0].legs[0].distance.value * 0.00062137)/(myFuelRange.overview_path.length);
              

              // for (var i = 0; i < myFuelRange.overview_path.length; i++) {
              //   var marker = new google.maps.Marker({
              //     position: myFuelRange.overview_path[22],
              //     // position: myFuelRange.overview_path[52],
              //     map: map
              //   });
              //   // console.log(scope.milesPerMarker);
              //     // console.log(myRoute.steps[i].start_location);
              //     // console.log(myRoute.steps[i].start_location);
              //     // console.log(myFuelRange.overview_path[i]);
              //   // attachInstructionText(marker, myRoute.steps[i].instructions);
                
              // }
              scope.$parent.$parent.updateMilesPerMarker(scope.milesPerMarker);

              // scope.$apply('updateMilesPerMarker(' + scope.milesPerMarker + ')');
            scope.$parent.$parent.$watch('num', function(newVal) {
                console.log("New val for watched prpo", newVal);
                // scope.range = num;
                for (var i = newVal; i < myFuelRange.overview_path.length; i += newVal) {
               new google.maps.Marker({
                  position: myFuelRange.overview_path[i],
                  // position: myFuelRange.overview_path[52],
                  map: map
                });
               console.log(myFuelRange.overview_path[i]);
           }

            });

            }


            // function attachInstructionText(marker, text) {
            //   google.maps.event.addListener(marker, 'click', function() {
            //     // Open an info window when the marker is clicked on,
            //     // containing the text of the step.
            //     stepDisplay.setContent(text);
            //     stepDisplay.open(map, marker);
            //   });
            // }




            scope.clearDirections = function() {
                scope.init();
                directionsDisplay.setPanel(null);
                scope.origin = '';
            };



        }
    };

    return mapObj;


});