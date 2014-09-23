'use strict';

/**
 * @ngdoc function
 * @name roadtripApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the roadtripApp
 */

app.controller('HomeCtrl', function ($scope,$location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.nextView = function() {
      console.log('works??');
      $location.path('/AddVehicle'); 
    };

  });