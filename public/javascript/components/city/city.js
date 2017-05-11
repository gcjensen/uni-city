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
        prepareFoodChart();
        prepareChartData();
        drawCrimeChart(response.data.crimeData);
        drawPopulationChart(response.data);
    });

    $scope.getStringRating = function (num) {

        if (num <= 1)
            return "Very Low";
        else if (num > 1 && num < 4)
            return "Below Average";
        else if (num >= 4 && num <= 6)
            return "Average";
        else if (num > 6 && num < 9)
            return "Above Average";
        else if (num >= 9)
            return "Very High";
        else
            return "n/a";
    }

    function prepareFoodChart() {
        $http.get('api/food/all-regions/').
        then(function(response) {
            drawFoodChart(response.data);
        });
    }

    function prepareChartData() {
        $http.get('api/all-data/all-cities/').
        then(function(response) {
            drawRentChart(response.data);
            drawWagesChart(response.data);
        });
    }

    function drawRentChart(data) {

        $scope.rentChart = {};

        $scope.rentChart.type = 'BarChart';

        let barData = [];

        for (let datum of data) {
            var city = datum['city'];
            var dataObjs = [];
            dataObjs.push( { v: city } );
            dataObjs.push( { v: datum['rent']['median'] } );

            if( city == $scope.cityName ) {
                dataObjs.push( { v: '#3A4C81' } );
            } else {
                dataObjs.push( { v: '#8894BB' } );
            }

            barData.push( {c: dataObjs } );
        }

        $scope.rentChart.data = {'cols': [
            {id: 't', label: 'City', type: 'string'},
            {id: 's', label: 'Monthly rent', type: 'number'},
            {role: "style", type: "string"},
        ], 'rows': barData};

        $scope.rentChart.options = {
            'width': '100%',
            'height': '100%',
            'chartArea': {left: 160, top: 20, width: '80%','height': '100%'},
            'legend': 'none',
            'bar': {groupWidth: "40%"},
            'hAxis': {
                'textStyle': {color: '#555'}
            },
            'vAxis': {
                'textStyle': {color: '#555'}
            }
          }

          $scope.rentChart.formatters = {
           number: [{
              pattern:'##,###',
               columnNum: 1,
               prefix: '£'
           }]
         };
        }

    function drawFoodChart(data) {

        $scope.foodChart = {};

        $scope.foodChart.type = 'BarChart';

        let barData = [];

        data = data.filter(obj =>
                           obj.region === "West Midlands" ||
                           obj.region === "East Midlands" ||
                           obj.region === "North East" ||
                           obj.region === "North West" ||
                           obj.region === "Yorkshire and The Humber" ||
                           obj.region === "East" ||
                           obj.region === "London" ||
                           obj.region === "South" ||
                           obj.region === "South East" ||
                           obj.region === "South West"
                          );

        for (let datum of data) {
            var region = datum['region'];
            var dataObjs = [];
            dataObjs.push( { v: region } );
            dataObjs.push( { v: datum['food and non-alcoholic drinks'] / datum['average persons per household'] } );

            if( region == $scope.cityData.region ) {
                dataObjs.push( { v: '#7c5a9d' } );
            } else {
                dataObjs.push( { v: '#b4a4c4' } );
            }

            barData.push( {c: dataObjs } );
        }

        $scope.foodChart.data = {'cols': [
            {id: 't', label: 'Region', type: 'string'},
            {id: 's', label: 'Food and non-alcoholic drinks', type: 'number'},
            {role: "style", type: "string"},
        ], 'rows': barData};

        $scope.foodChart.options = {
            'width': '100%',
            'height': '100%',
            'chartArea': {left: 160, top: 20, width: '80%','height': '100%'},
            'legend': 'none',
            'bar': {groupWidth: "40%"},
            'hAxis': {
                'textStyle': {color: '#555'}
            },
            'vAxis': {
                'textStyle': {color: '#555'}
            }
        }

        $scope.foodChart.formatters = {
         number: [{
             columnNum: 1,
             prefix: '£'
         }]
        };
    }

    function drawCrimeChart(data) {

        $scope.crimeChart = {};

        $scope.crimeChart.type = 'PieChart';

        let pieData = [];

        var dataObjs = [];
        dataObjs.push( { v: 'Burglary' } );
        dataObjs.push( { v: parseFloat(data['burglary']) } );
        pieData.push( {c: dataObjs } );

        var dataObjs1 = [];
        dataObjs1.push( { v: 'Robbery' } );
        dataObjs1.push( { v: parseFloat(data['robbery']) } );
        pieData.push( {c: dataObjs1 } );

        var dataObjs2 = [];
        dataObjs2.push( { v: 'Violence And Sexual Offences' } );
        dataObjs2.push( { v: parseFloat(data['violenceAndSexualOffences']) } );
        pieData.push( {c: dataObjs2 } );

        /*
        var dataObjs3 = [];
        dataObjs3.push( { v: 'Others' } );
        dataObjs3.push( { v: parseFloat(data['total'])-(parseFloat(data['burglary'])+parseFloat(data['robbery'])+parseFloat(data['violenceAndSexualOffences'])) } );
        pieData.push( {c: dataObjs3 } );
        */

        $scope.crimeChart.data = {'cols': [
          {id: 't', label: 'Crime', type: 'string'},
          {id: 's', label: 'Occurance', type: 'number'},

        ], 'rows': pieData};

        $scope.crimeChart.options = {
            'slices': [{color:'#7C5A9D'},{color:'#B4A4C4'},{color:'#3A4C81'},{color:'#8894BB'}],
            'width': '100%',
            'height': '100%',
            'hAxis': {
                'textStyle': {color: '#555'}
            },
            'vAxis': {
                'textStyle': {color: '#555'}
            }
        }
      }

    function drawWagesChart(data) {
        $scope.wagesChart = {};

        $scope.wagesChart.type = 'BarChart';

        let barData = [];

        for (let datum of data) {
            var city = datum['city'];
            var dataObjs = [];
            dataObjs.push( { v: city } );
            dataObjs.push( { v: datum['wages']['averageWage'] } );

            if( city == $scope.cityName ) {
                dataObjs.push( { v: '#7c5a9d' } );
            } else {
                dataObjs.push( { v: '#b4a4c4' } );
            }

            barData.push( {c: dataObjs } );
        }

        $scope.wagesChart.data = {'cols': [
            {id: 't', label: 'City', type: 'string'},
            {id: 's', label: 'Annual salary', type: 'number'},
            {role: "style", type: "string"},
        ], 'rows': barData};

        $scope.wagesChart.options = {
            'width': '100%',
            'height': '100%',
            'chartArea': {left: 160, top: 20, width: '80%','height': '100%'},
            'legend': 'none',
            'bar': {groupWidth: "40%"},
            'hAxis': {
                'textStyle': {color: '#555'}
            },
            'vAxis': {
                'textStyle': {color: '#555'}
            }
          }

          $scope.wagesChart.formatters = {
           number: [{
              pattern:'##,###',
               columnNum: 1,
               prefix: '£'
           }]
         };
        }

        function drawPopulationChart(data) {

            $scope.populationChart = {};

            $scope.populationChart.type = 'PieChart';

            let pieData = [];

            var dataObjs1 = [];
            dataObjs1.push( { v: 'Students' } );
            dataObjs1.push( { v: parseFloat(data['studentPopulation']) } );
            pieData.push( {c: dataObjs1 } );

            var dataObjs = [];
            dataObjs.push( { v: 'Others' } );
            dataObjs.push( { v: parseFloat(data['population']) - parseFloat(data['studentPopulation']) } );
            pieData.push( {c: dataObjs } );

            $scope.populationChart.data = {'cols': [
              {id: 't', label: 'Total population', type: 'string'},
              {id: 's', label: 'Student population', type: 'number'},

            ], 'rows': pieData};

            $scope.populationChart.options = {
                'slices': [{color:'#3A4C81'}, {color:'#8894BB'}],
                'width': '100%',
                'height': '100%',
                'hAxis': {
                    'textStyle': {color: '#555'}
                },
                'vAxis': {
                    'textStyle': {color: '#555'}
                }
            }
          }

    $scope.openMap = function (address) {
        let win = window.open('http://maps.google.com/?q=' + address, '_blank');
    }
});
