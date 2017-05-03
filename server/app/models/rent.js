'use strict';

const ComparisonService = require('../services/comparison-service');
const ParsingService = require('../services/parsing-service');

let citiesWithRent;
ParsingService.parseCSV('rent.csv')
  .then((data) => citiesWithRent = data);

const getDataForCity = (city) => {
  return new Promise((resolve, reject) => {
    const rent = citiesWithRent.find((c) => c.area === city);
    const { median, mean } = rent;
    const rating = ComparisonService.compareEnglandProp(citiesWithRent, median, 'median', 10, 'area');
    resolve({ median, mean, rating });
  });
};

module.exports.getDataForCity = getDataForCity;
