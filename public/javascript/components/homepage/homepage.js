angular.module('open-data').component('homepage', {
    templateUrl: '/javascript/components/homepage/homepage.html',
    controller: 'HomepageController',
});


angular.module('open-data').controller('HomepageController', function ($rootScope, $scope, $location) {
    
    $scope.viewCity = function (city) {
        $location.path('/city/' + city);
    }
    
    $scope.cities = ['southampton', 'bristol', 'london'];
    
    $scope.getSearchLogoStyle = function (focused) {
        if (focused)
            return 'input-logo-focus';
        else
            return 'input-logo-blur';
    }

});
