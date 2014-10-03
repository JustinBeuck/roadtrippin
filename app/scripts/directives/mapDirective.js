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
        gasStationsArray = [],
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
            '</div>' +
            '<div id="theMap"></div>' + '<br />' +
            '<button class="getDirections" ng-click="getDirections()" ng-disabled="mapContainer.$invalid">Get Directions</button> ' +
            '<button class="getDirections" ng-click="clearDirections()" ng-disabled="mapContainer.$invalid">Clear</button>' + '<br />' +
            '</form>', // todo: use template url and template file
        link: function(scope, element, attrs) {
            scope.$on('add-gas-station', function(e, data) {
            
                    if (data.name != null && data.address != null && data.city != null && data.state != null && data.zip != null && data.reg != null && data.reg == "N/A") {
                        // debugger;
                    scope.addGasStation(parseFloat(data.lat), parseFloat(data.lng), data.name, data.address, data.city, data.state, data.zip, data.reg = 'Price is Unavailable');
                    
                }
                    else {

                        scope.addGasStation(parseFloat(data.lat), parseFloat(data.lng), data.name, data.address, data.city, data.state, data.zip, data.reg );
                
                }
            });
            console.log("working!!!!!!!!!!!");
            scope.init = function() {

                var mapOptions = {
                    zoom: scope.zoom !== undefined ? scope.zoom : 16,
                    mapTypeId: scope.type.toLowerCase(),
                    streetViewControl: false
                };
                map = new google.maps.Map(document.getElementById('theMap'), mapOptions);
                scope.endPoint = scope.destination !== undefined ? scope.destination : '8012 San Miguel Cir Buena Park, CA 90620';

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
              


                scope.$parent.$parent.updateMilesPerMarker(scope.milesPerMarker);


                scope.$parent.$parent.$watch('num', function(newVal) {
                for (var i = newVal; i < myFuelRange.overview_path.length; i += newVal) {
                    new google.maps.Marker({
                      position: myFuelRange.overview_path[i],
                      icon: '/images/gasstations/red_fuel.png',
                      // position: myFuelRange.overview_path[52],
                      map: map
                    });
               
                // console.log(myFuelRange.overview_path[i]);
                // console.log(myFuelRange.overview_path[i].B);
                scope.$parent.$parent.gasStations(myFuelRange.overview_path[i].B, myFuelRange.overview_path[i].k)
                // visolate scope & to fix ^
               $('#directionsList').show();
                // var latitude = myFuelRange.overview_path[i].k;
                // console.log(myFuelRange.overview_path[i].k);
            }

            });

            }

// scope.addGasStation(parseFloat(data.lat), parseFloat(data.lng), data.name, data.address, data.city, data.region, data.zip, data.reg_price);
            scope.addGasStation = function(mylat, mylng, gasStationName, gasAddress, gasCity, gasState, gasZip, regularGas) {
                
                var contentString = '<div id="content">'+
                  '<div id="siteNotice">'+
                  '</div>'+
                  '<h2 id="firstHeading" class="firstHeading">'+gasStationName+ '</h2>'+
                  '<h5> Regular Gas Price: '+regularGas+'</h5>'+
                  '<div id="bodyContent">'+'<p>'+gasAddress+'</p>'+
                  '<p>'+gasCity+', '+gasState+' '+gasZip+'</p>'+
                  '</div>'+
                  '</div>';

                var infowindow = new google.maps.InfoWindow({
                  content: contentString
              });
                
                // var station = gasStationName.toUpperCase();
                var coordObject = new google.maps.LatLng(mylat, mylng);
                var marker1 = new google.maps.Marker({
                    position: coordObject,
                    icon: '/images/gasstations/red_fuel.png',
                    // icon: 'http://www.poi-factory.com/files/img/'+station+'%20Station.BMP',
                    map: map,
                    // title: gasStationName
                });

                google.maps.event.addListener(marker1, 'click', function() {
                    console.log("Clicked")
                    // infowindow.setContent(contentString); 
                    infowindow.open(map,marker1);
                    });
                // return marker1;


                // google.maps.event.trigger(map, 'resize');
            }


            scope.clearDirections = function() {
                scope.init();
                directionsDisplay.setPanel(null);
                scope.origin = '';
            };



        }
    };

    return mapObj;


});