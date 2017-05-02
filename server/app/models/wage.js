'use strict';

const ComparisonService = require('../services/comparison-service');
const ParsingService = require('../services/parsing-service');
const ConstituencyService = require('../services/constituency-service');

let citiesWithWageData;
ParsingService.parseCSV('wage.csv')
  .then((data) => citiesWithWageData = data);

const getDataForCity = (city) => {
  return new Promise((resolve, reject) => {
    let constituencyWages = ConstituencyService.filterByConstituencies(city, citiesWithWageData);
	constituencyWages = constituencyWages.filter((c) => !isNaN(c.Median));
    let totalWage = constituencyWages.reduce((a, b) => ({Median: parseInt(a.Median) + parseInt(b.Median)}), ({Median:0}));
    let averageWage = totalWage.Median / constituencyWages.length;

    const rating = compareWageAmount(averageWage);
    resolve({ average: averageWage, rating: rating });
  });
};

// TODO As with the rent one, could probably do with some complexity
function compareWageAmount(wage) {
  let filteredData = citiesWithWageData.filter((c) => !isNaN(c.Median));
  let totalWage = filteredData.reduce((a, b) => ({Median: parseInt(a.Median) + parseInt(b.Median)}), ({Median:0}));
  let averageWage = totalWage.Median / filteredData.length;

  if (wage < averageWage) return 'Below Average';
  if (wage > averageWage) return 'Above Average';
  if (wage === averageWage) return 'Average';
}


module.exports.getDataForCity = getDataForCity;
