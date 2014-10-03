(function() {


    var carController = function($scope, $http, $location, $rootScope) {

        $scope.selectedtrimId = "";

        // console.log('in carController');
        // get all the makes
        $http.get('https://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=7fr982626at7633r7qgcwu87')
            .then(
                function(response) {
                    // console.log(response.data)
                    $scope.makes = response.data.makes;
                    // console.log("makes", $scope.makes);
                },
                function(error) {
                    $scope.error1 = JSON.stringify(error);
                }
        );

        // for each make - get all the models.
        $scope.getmodels = function(makeIdStr) {
            var makeId = parseInt(makeIdStr);

            var make = _.find($scope.makes, function(scopeMake) {
                return scope.Make.id === makeId
            });
            $http.get('https://api.edmunds.com/api/vehicle/v2/' + make.name + '/models?fmt=json&api_key=7fr982626at7633r7qgcwu87')
                .then(
                    function(response) {

                        $scope.models = response.data.models;
                    },
                    function(error) {
                        $scope.error2 = JSON.stringify(error);
                    }
            );
        };

        $scope.getyears = function(modelIdStr) {
            // console.log("finding modelId", modelIdStr)

            var model = _.find($scope.models, function(scopeModel) {
                return scopeModel.id === modelIdStr
                console.log(modelIdStr);
            });

            $scope.years = model.years;

        };

        $scope.getTrims = function(yearIdStr) {
            console.log("finding yearIdStr", yearIdStr)
            makeYearId = parseInt(yearIdStr);

            var trim = _.find($scope.years, function(scopeYear) {

                return scopeYear.id === makeYearId


            });

            $scope.styles = trim.styles;

        };

        $scope.getFuelCapacity = function() {



            $http.get('https://api.edmunds.com/api/vehicle/v2/styles/' + $scope.selectedtrimId.id + '/equipment?availability=standard&equipmentType=OTHER&name=SPECIFICATIONS&fmt=json&api_key=7fr982626at7633r7qgcwu87')
                .then(
                    function(response) {

                        console.log(response);
                        $scope.milesPerGallon = _.find(response.data.equipment[0].attributes,
                            function(obj) {
                                return obj.name == "Epa Combined Mpg";
                            });
                        console.log($scope.milesPerGallon.value)

                        $scope.fuelCapacity = _.find(response.data.equipment[0].attributes,
                            function(some) {
                                return some.name == "Fuel Capacity";
                            });
                        console.log($scope.fuelCapacity.value)

                        $scope.milesToEmptyTank = Math.round(($scope.milesPerGallon.value * $scope.fuelCapacity.value));
                        console.log($scope.milesToEmptyTank);

                        $rootScope.milesToEmptyTank = $scope.milesToEmptyTank;
                        $scope.grabMiles($scope.milesToEmptyTank);

                        setTimeout(function() {


                            $(".dial").knob({
                                readOnly: true,
                                width: "100",
                                fgColor: "#c0392b",
                                skin: "tron",
                                thickness: ".5",
                                displayPrevious: true
                            });

                            $(".dial2").knob({
                                readOnly: true,
                                width: "100",
                                fgColor: "#3498db",
                                skin: "tron",
                                thickness: ".5",
                                displayPrevious: true
                            });

                            $(".dial3").knob({
                                readOnly: true,
                                width: "100",
                                fgColor: "#16a085",
                                skin: "tron",
                                thickness: ".5",
                                displayPrevious: true
                            });
                        }, 1);


                    },
                    function(error) {
                        $scope.error2 = JSON.stringify(error);
                    }

            );
        };


        $scope.nextView2 = function() {
            // console.log('still works??');
            $location.path('/AddAddress');
        };

    };

    app.controller('carController', ['$scope', '$http', '$location', '$rootScope', carController]);
})();