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
        });
    
});