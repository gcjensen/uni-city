'use strict';

const ComparisonService = require('../services/comparison-service');
const ParsingService = require('../services/parsing-service');

let citiesWithCrimeData;
ParsingService.parseCSV('crime.csv')
  .then((data) => citiesWithCrimeData = data);

const getDataForCity = (city) => {
  const crimeData = citiesWithCrimeData.find((c) => c.city === city);
  const { robbery, burglary, violenceAndSexualOffences, total } = crimeData;
  const rating = ComparisonService.compare(citiesWithCrimeData, total, 'total');
  return { robbery, burglary, violenceAndSexualOffences, total, rating };
};

module.exports.getDataForCity = getDataForCity;
