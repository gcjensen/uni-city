angular.module('open-data').component('ranking', {
    templateUrl: '/javascript/components/ranking/ranking.html',
    controller: 'RankingController',
});


angular.module('open-data').controller('RankingController', function ($scope) {

  $scope.data = [
    {
      "name": "London",
      "Population": {
        "actual": 8674000,
        "relative": 10,
      },
      "Cost of Living": {
        "actual": 'High',
        "relative": 1,
      },
      "Nightlife": {
        "actual": 'Excellent',
        "relative": 8,
      }
    },
    {
      "name": "Southampton",
      "Population": {
        "actual": 236900,
        "relative": 6,
      },
      "Cost of Living": {
        "actual": 'Average',
        "relative": 6,
      },
      "Nightlife": {
        "actual": 'Good',
        "relative": 6,
      }
    },
    {
      "name": "York",
      "Population": {
        "actual": 198051,
        "relative": 4,
      },
      "Cost of Living": {
        "actual": 'Low',
        "relative": 5,
      },
      "Nightlife": {
        "actual": 'Average',
        "relative": 6,
      }
    }
  ]

  $scope.userPreferences = Object.keys($scope.data[0]).filter((key) => key !== "name");

  // not sure of the angular function convention
  const determineRanking = (data, userPreferences) => {
    for (let datum of data) {
      total = 0.0;
      for (let i = 0; i < userPreferences.length; i++) {
        total += datum[userPreferences[i]].relative * (userPreferences.length - i);
      }
      datum.ranking = total;
    }
    return data;
  }

  $scope.$watch('userPreferences', function () {
    $scope.data = determineRanking($scope.data, $scope.userPreferences);
    $scope.data.sort((a, b) => a.ranking < b.ranking);
  }, true);

});
