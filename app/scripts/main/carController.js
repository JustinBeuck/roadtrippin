(function() {
  var app = angular.module('roadtrippin', []);
    
    
    var carController = function($scope, $http) {
      // get all the makes
        $http.get('https://api.edmunds.com/api/vehicle/v2/makes?state=new&view=basic&fmt=json&api_key=7fr982626at7633r7qgcwu87')
        .then(function (response)
              {
                $scope.makes = response.data.makes;
                }, function (error) {
                $scope.error1 = JSON.stringify(error);
                });
        
        // for each make - get all the models.
        $scope.getmodels = function(make) {
          console.log(make);
            $http.get('https://api.edmunds.com/api/vehicle/v2/'+make+'/models?state=new&view=basic&fmt=json&api_key=7fr982626at7633r7qgcwu87')
        .then(function (response)
              {
                console.log(response.data);
                $scope.models = response.data;
                }, function (error) {
                $scope.error2 = JSON.stringify(error);
                });
        };
    };
    
    app.controller('carController', ['$scope', '$http', carController]);
})();