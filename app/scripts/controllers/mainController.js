'use strict';

/**
 * @ngdoc function
 * @name roadtripApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the roadtripApp
 */

app.controller('mainController', function ($scope,$location,$http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    

    $scope.nextView = function() {
      console.log('works??');
      $location.path('/AddVehicle'); 
    },

    $scope.nextView2 = function() {
      console.log('still works??');
      $location.path('/AddAddress'); 
    };

  });