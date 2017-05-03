angular.module('open-data').component('ranking', {
    templateUrl: '/javascript/components/ranking/ranking.html',
    controller: 'RankingController',
});


angular.module('open-data').controller('RankingController', function ($scope, $http) {


  $http.get('api/all-data/all-cities').
      then((response) => {
          $scope.data = response.data;
          $scope.userPreferences = Object.keys($scope.data[0]).filter((key) => key !== "city");
      });

  $scope.dataTypes = {
    "Rent": "Average Monthly Room Rent",
    "Nightlife": "Average Google Club Rating",
    "Broadband": "Average Broadband Speed",
    "Food": "Average Weekly Food Shop",
    "Crime": "Offences per 1000 people",
    "Wage": "Average Wage"
  }


  /*
   * Simple algorithm for location ranking.
   * Each location has a relative score for each property
   * (between 1 and 10), which is then multiplied by a number
   * according to how the user has ranked their preferences,
   * i.e. if there are 3 preferences, the top one will multiply
   * by 3, the second one by 2 and the third one by 1. The
   * locations are then ordered according to their overall score.
   */
  // const determineRanking = (data, userPreferences) => {
  //   for (let datum of data) {
  //     total = 0.0;
  //     for (let i = 0; i < userPreferences.length; i++) {
  //       total += datum[userPreferences[i]].relative * (userPreferences.length - i);
  //     }
  //     datum.ranking = total;
  //   }
  //   return data.sort((a, b) => a.ranking < b.ranking);
  // }

  // $scope.$watch('userPreferences', function () {
  //   $scope.data = determineRanking($scope.data, $scope.userPreferences);
  // }, true);

});
