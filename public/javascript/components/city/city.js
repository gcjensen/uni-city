angular.module('open-data').component('city', {
    templateUrl: '/javascript/components/city/city.html',
    controller: 'CityController',
});


angular.module('open-data').controller('CityController', function ($scope, $location, $routeParams, $http) {
    
    $scope.cityData;
    
    $scope.cityName = $routeParams.arg;
    
    /* Load data for the specified city in URL */
    $http.get('api/all-data/' + $scope.cityName).
        then(function(response) {
            $scope.cityData = response.data;
            console.log(response.data);
            prepareFoodChart();
        });

    function prepareFoodChart() {
        $http.get('api/food/all-regions/').
                then(function(response) {
                    console.log(response.data);
                    drawFoodChart(response.data);
                });
    }

    function drawFoodChart(data) {

        $scope.foodChart = {};
    
        $scope.foodChart.type = 'BarChart';
        
        let barData = [];

        for (let datum of data) {
            var region = datum['region'];
            var dataObjs = [];
            dataObjs.push( { v: region } );
            dataObjs.push( { v: datum['food and non-alcoholic drinks'] / datum['average persons per household'] } );
            
            if( region == $scope.cityData.region ) {
                dataObjs.push( { v: '#3366cc' } );
            } else {
                dataObjs.push( { v: '#7093db' } );
            }
            
            dataObjs.push( { v: datum['alcoholic drink, tobacco and narcotics'] / datum['average persons per household'] } );

            if( region == $scope.cityData.region ) {
                dataObjs.push( { v: '#dc3912' } );
            } else {
                dataObjs.push( { v: '#e67459' } );
            }
            
            barData.push( {c: dataObjs } );
        }

        $scope.foodChart.data = {'cols': [
            {id: 't', label: 'Region', type: 'string'},
            {id: 's', label: 'Food and non-alcoholic drinks', type: 'number'},
             {role: "style", type: "string"},
           {id: 's', label: 'Alcohol, tobacco and narcotics', type: 'number'},
            {role: "style", type: "string"}
        ], 'rows': barData};

        $scope.foodChart.options = {
            'title': 'Average Weekly Food, Drink and Narcotic Spend by Region'
        };
        
    }
});