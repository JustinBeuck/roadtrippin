'use strict';

/**
 * @ngdoc function
 * @name roadtripApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the roadtripApp
 */

angular.module('roadtrippin')
  .controller('MainCtrl', function ($scope) {
    $scope.addressSend = function() {
      $scope.startAddress;
      $scope.endAddress;
    };
  });

angular.module('startForm', [])
.controller('')

