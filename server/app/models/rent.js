'use strict';

const RatingService = require('../services/rating-service');
const ParsingService = require('../services/parsing-service');

let citiesWithRent;
ParsingService.parseCSV('rent.csv')
  .then((data) => citiesWithRent = data);

const getDataForCity = (city) => {
  return new Promise((resolve, reject) => {
    const rent = citiesWithRent.find((c) => c.city === city);
    const { median, mean } = rent;
    const rating = RatingService.rate(citiesWithRent, median, 'median');
    resolve({ median, mean, rating });
  });
};

module.exports.getDataForCity = getDataForCity;
