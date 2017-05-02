angular.module('open-data').component('main', {
    templateUrl: '/javascript/components/main/main.html',
    controller: 'MainController',
});


angular.module('open-data').controller('MainController', function ($scope, $location, $routeParams) {

  $scope.currentPage = 'homepage';

  $scope.changeToPage = function(page) {
    $location.path('/' + page);
  }
  
  $scope.viewCity = function(city){
    $location.path('/city/' + city);
  };

});
