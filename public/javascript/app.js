angular
    .module('open-data', ['ngAnimate', 'ngRoute', 'psi.sortable', 'ui.sortable', 'ngMaterial', 'md.data.table', 'googlechart'])    
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
        $routeProvider.when('/about', {
            controller: 'AboutController',
            templateUrl: '/javascript/components/about/about.html',
        });
        $routeProvider.when('/city/:arg', {
            controller: 'CityController',
            templateUrl: '/javascript/components/city/city.html',
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    });
