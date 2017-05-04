'use strict';

const RatingService = require('../services/rating-service');
const ParsingService = require('../services/parsing-service');

let citiesWithCrimeData;
ParsingService.parseCSV('crime.csv')
  .then((data) => citiesWithCrimeData = data);

const getDataForCity = (city) => {
  return new Promise((resolve, reject) => {
    const crimeData = citiesWithCrimeData.find((c) => c.city === city);
    const { robbery, burglary, violenceAndSexualOffences, total } = crimeData;
    const rating = RatingService.rate(citiesWithCrimeData, total, 'total');
    resolve({ robbery, burglary, violenceAndSexualOffences, total, rating });
  });
};

module.exports.getDataForCity = getDataForCity;
