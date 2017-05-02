angular.module('open-data').component('homepage', {
    templateUrl: '/javascript/components/homepage/homepage.html',
    controller: 'HomepageController',
});


angular.module('open-data').controller('HomepageController', function ($rootScope, $scope, $location) {
    
    $scope.viewCity = function (city) {
        $location.path('/city/' + city);
    }

});
