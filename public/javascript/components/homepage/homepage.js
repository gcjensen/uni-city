angular.module('open-data').component('homepage', {
    templateUrl: '/javascript/components/homepage/homepage.html',
    controller: 'HomepageController',
});


angular.module('open-data').controller('HomepageController', function ($rootScope, $scope, $location, $http) {
      
    $scope.cities;
    
    $scope.viewCity = function (city) {
        $location.path('/city/' + city);
    }
    
    $scope.getSearchLogoStyle = function (focused) {
        if (focused)
            return 'input-logo-focus';
        else
            return 'input-logo-blur';
    }
    
    /* Load data for the specified city in URL */
    $http.get('api/cities').
        then(function(response) {
            $scope.cities= response.data;
            console.log(response.data);
        });

});
