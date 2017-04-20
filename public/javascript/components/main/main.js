angular.module('open-data').component('main', {
    templateUrl: '/javascript/components/main/main.html',
    controller: 'MainController',
});


angular.module('open-data').controller('MainController', function ($scope) {

  $scope.currentPage = 'map';

  $scope.changeToPage = function(page) {

    // remove the map on page change to stop duplicate renderings.
    // not sure of the correct way to do this though...
    if (d3.select('svg')) {
      d3.select('svg').remove();
    }
    $scope.currentPage = page;
  }

});
