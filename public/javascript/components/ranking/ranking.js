angular.module('open-data').component('ranking', {
    templateUrl: '/javascript/components/ranking/ranking.html',
    controller: 'RankingController',
});

angular.module('open-data').controller('RankingController', function ($scope, $http, $location) {

  $scope.icon = 'check';

  $http.get('api/all-data/all-cities')
    .then((response) => {
        $scope.cities = rankCities(response.data);
    });

  $scope.dataTypes = [
    {name: "Rent", description: "Average Monthly Room Rent"},
    {name: "Nightlife", description: "Average Google Club Rating"},
    {name: "Broadband", description: "Average Broadband Speed"},
    {name: "Food Cost", description: "Average Weekly Food Shop"},
    {name: "Crime", description: "Offences per 1000 people"},
    {name: "Wage", description: "Average Wage"}
  ]

  $scope.active = []

  $scope.inactive = [
    {name: "Rent", dataRef: "rent", description: "Average Monthly Room Rent", icon: ""},
    {name: "Nightlife", dataRef: "nightlife", description: "Average Google Club Rating", icon: ""},
    {name: "Broadband", dataRef: "broadband", description: "Average Broadband Speed", icon: ""},
    {name: "Food Cost", dataRef: "food", description: "Average Weekly Food Shop", icon: ""},
    {name: "Crime", dataRef: "crimeData", description: "Offences per 1000 people", icon: ""},
    {name: "Wage", dataRef: "wages", description: "Average Wage", icon: ""}
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

  $scope.check = (name) => {
    return $scope.active.some((e) => e.name == name);
  }

  const rankCities = (cities) => {
    for (let city of cities) {
      totalRating = 0;
      for (let factor in city) {
        totalRating += city[factor].rating || city[factor].foodRating || 0;
      }
      // Divide by 6 to get rating out of 10
      city.totalRating = Math.round((totalRating/6) * 10) / 10;
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
  const rankCitiesByUserPreferences = (cities, userPreferences) => {
    for (let city of cities) {
      total = 0.0;
      for (let i = 0; i < userPreferences.length; i++) {
        const rating = city[userPreferences[i].dataRef].rating || city[userPreferences[i].dataRef].foodRating || 0;
        total +=  rating * (1 + ((userPreferences.length - i)/2));
      }
      //city.totalRating =  Math.round(total * 10) / 10;
    
      let temp = 0;
      for (let i = 1; i <= userPreferences.length; i++){
          temp += (1 + i/2);
      }
      city.totalRating = Math.round((total / temp) * 10) / 10;
      
        
    }
    return cities;
  }

  $scope.$watch('active', () => {
    if ($scope.cities) {
      if ($scope.active.length === 0) $scope.cities = rankCities($scope.cities);
      else $scope.cities = rankCitiesByUserPreferences($scope.cities, $scope.active);
    }
  }, true);
    
  $scope.viewCity = function (city) {
    $location.path('/city/' + city);
  }

});
