angular.module('open-data').component('ranking', {
    templateUrl: '/javascript/components/ranking/ranking.html',
    controller: 'RankingController',
});


angular.module('open-data').controller('RankingController', function ($scope, $http) {

    $scope.icon = 'check';

  $http.get('api/all-data/all-cities').
      then((response) => {
          $scope.data = rankCities(response.data);
          $scope.userPreferences = Object.keys($scope.data[0]).filter((key) => key !== "city");
      });


  $scope.dataTypes = [
    {name: "Rent", description: "Average Monthly Room Rent"},
    {name: "Nightlife", description: "Average Google Club Rating"},
    {name: "Broadband", description: "Average Broadband Speed"},
    {name: "Food", description: "Average Weekly Food Shop"},
    {name: "Crime", description: "Offences per 1000 people"},
    {name: "Wage", description: "Average Wage"}
  ]

  $scope.active = []

  $scope.inactive = [
    {name: "Rent", description: "Average Monthly Room Rent", icon: ""},
    {name: "Nightlife", description: "Average Google Club Rating", icon: ""},
    {name: "Broadband", description: "Average Broadband Speed", icon: ""},
    {name: "Food", description: "Average Weekly Food Shop", icon: ""},
    {name: "Crime", description: "Offences per 1000 people", icon: ""},
    {name: "Wage", description: "Average Wage", icon: ""}
  ]

  $scope.activate = function (preference) {
    $scope.inactive = $scope.inactive.filter(obj => obj !== preference);
    preference.icon = '';
    $scope.active.push(preference);
  }

  $scope.deactivate = function (preference) {
    $scope.active = $scope.active.filter(obj => obj !== preference);
    preference.icon = '';
    $scope.inactive.push(preference);
  }


  const rankCities = (cities) => {
    for (let city of cities) {
      totalRating = 0;
      for (let factor in city) {
        totalRating += city[factor].rating || 0;
      }
      city.totalRating = Math.round(totalRating * 10) / 10;
    }
    return cities;
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
