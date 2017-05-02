'use strict';

const ComparisonService = require('../services/comparison-service');
const ParsingService = require('../services/parsing-service');
const ConstituencyService = require('../services/constituency-service');

let citiesWithWageData;
ParsingService.parseCSV('wages.csv')
  .then((data) => citiesWithWageData = data);

const getDataForCity = (city) => {
  return new Promise((resolve, reject) => {
    let constituencyWages = ConstituencyService.filterByConstituencies(city, citiesWithWageData);
    constituencyWages = constituencyWages.filter((c) => !isNaN(c.Median));
    constituencyWages = constituencyWages.map((d) => d['Median']);

    let totalWage = constituencyWages.reduce((a, b) => (parseInt(a) + parseInt(b)), 0);
    let average = totalWage / constituencyWages.length;

    const rating = ComparisonService.compare(citiesWithWageData, average, 'Median', 20);
    resolve({ average, rating });
  });
};

module.exports.getDataForCity = getDataForCity;
