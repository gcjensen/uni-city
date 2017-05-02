'use strict';

const ParsingService = require('../services/parsing-service');

let citiesWithRent;
ParsingService.parseCSV('rent.csv')
  .then((data) => citiesWithRent = data);

const getDataForCity = (city) => {
  return new Promise((resolve, reject) => {
    const rent = citiesWithRent.find((c) => c.area === city);
    const { median, mean } = rent;
    const rating = compareRentAmount(median);
    resolve({ median, mean, rating });
  });
};

module.exports.getDataForCity = getDataForCity;

// Simple rent 'rating' function - needs to be improved
function compareRentAmount(rent) {
  const averageRent = citiesWithRent.find((c) => c.area === 'England').median;
  if (rent < averageRent) return 'Below Average';
  if (rent > averageRent) return 'Above Average';
  if (rent === averageRent) return 'Average';
}
