(function() {

    
  var carController = function($scope, $http, $location) {

    $scope.selectedtrimId = "";

    console.log('in carController');
    // get all the makes
      $http.get('https://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=7fr982626at7633r7qgcwu87')
      .then(
        function (response) {
          console.log(response.data)
          $scope.makes = response.data.makes;
          console.log("makes", $scope.makes);
        },
        function (error) {
          $scope.error1 = JSON.stringify(error);
        }
      );
      
      // for each make - get all the models.
      $scope.getmodels = function(makeIdStr) {
        makeId = parseInt(makeIdStr);

        var make = _.find($scope.makes, function (scopeMake) {
          return scopeMake.id === makeId
        });

        console.log("Selecting models for:", make);
        $http.get('https://api.edmunds.com/api/vehicle/v2/'+make.name+'/models?fmt=json&api_key=7fr982626at7633r7qgcwu87')
        .then(
          function (response) {
            console.log("Got models:", response.data);
            $scope.models = response.data.models;
            console.log("Scope models:", $scope.models);
          },
          function (error) {
            $scope.error2 = JSON.stringify(error);
          }
        );
      };

      $scope.getyears = function(modelIdStr) {
        console.log("finding modelId", modelIdStr)

        var model = _.find($scope.models, function (scopeModel) {
          return scopeModel.id === modelIdStr
        });

        console.log("Selecting years for:", model);

        $scope.years = model.years;
          //  (response) {
          //   console.log("Got models:", response.data);
          //   $scope.models = response.data.models;
          //   console.log("Scope models:", $scope.models);
          // },
          // function (error) {
          //   $scope.error2 = JSON.stringify(error);
          // }
      };

      $scope.getTrims = function(yearIdStr) {
        console.log("finding yearIdStr", yearIdStr)
        makeYearId = parseInt(yearIdStr);

        var trim = _.find($scope.years, function (scopeYear) {
          console.log("finding selected years", $scope.years);
          console.log("finding scopeYear", scopeYear);
          return scopeYear.id === makeYearId

          
        });

        console.log("Selecting styles for:", trim);

        $scope.styles = trim.styles;

      };

        $scope.getFuelCapacity = function() {

          console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
          console.log("finding fuel capacity Id", $scope.selectedtrimId.id);
        // trimId = parseInt(selectedTrimId);
        

        
        $http.get('https://api.edmunds.com/api/vehicle/v2/styles/'+$scope.selectedtrimId.id+'/equipment?availability=standard&equipmentType=OTHER&name=SPECIFICATIONS&fmt=json&api_key=7fr982626at7633r7qgcwu87')
        .then(
          function (response) {
            console.log("trying to find MPG:", response.data.equipment[0].attributes)
            // nicks dumb ill crazy hot stupid fresh javascript skills below.
            milesPerGallon = _.find(response.data.equipment[0].attributes,
                                 function(obj){ return obj.name == "Epa Combined Mpg"; });
            console.log(milesPerGallon.value)

            fuelCapacity = _.find(response.data.equipment[0].attributes,
                                 function(some){ return some.name == "Fuel Capacity"; });
            console.log(fuelCapacity.value)

            milesToEmptyTank = (milesPerGallon.value * fuelCapacity.value);
            console.log(milesToEmptyTank);
          },
          function (error) {
            $scope.error2 = JSON.stringify(error);
          }
        );
      };
      
      $scope.nextView2 = function() {
      console.log('still works??');
      $location.path('/AddAddress'); 
    };
    

  };
  
  app.controller('carController', ['$scope', '$http', '$location', carController]);
})();
