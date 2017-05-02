angular
    .module('open-data', ['ngRoute', 'psi.sortable', 'ngMaterial', 'md.data.table'])
    
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'HomepageController',
            templateUrl: '/javascript/components/homepage/homepage.html',
            animate: "fading"
        });
        $routeProvider.when('/ranking', {
            controller: 'RankingController',
            templateUrl: '/javascript/components/ranking/ranking.html',
        });
        $routeProvider.when('/city/:arg', {
            controller: 'CityController',
            templateUrl: '/javascript/components/city/city.html',
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    });
