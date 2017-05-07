angular.module('open-data').component('main', {
    templateUrl: '/javascript/components/main/main.html',
    controller: 'MainController',
});


angular.module('open-data').controller('MainController', function ($rootScope, $scope, $location, $routeParams) {

  // What happens when city?
  $scope.currentPage = $location.path().split("/")[1];
  if ($scope.currentPage === "") $scope.currentPage = "homepage";

  $scope.changeToPage = function(page) {
    $location.path('/' + page);
    $scope.currentPage = page;
  }
  
  $scope.getLogoStyle = function () {
    if ($location.path().split("/")[1] === "city" || $location.path().split("/")[1] === "about")
      return 'menu-logo-white';
    else
      return 'menu-logo';
  }
    
  $scope.getMenuItemStyle = function (name) {
    if ($location.path().split("/")[1] === "city" || $location.path().split("/")[1] === "about")
      return 'menu-item-white';
    else if ($scope.currentPage === name)
      return 'menu-item-active';
    else
      return 'menu-item';
  }

});
