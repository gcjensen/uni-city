'use strict';

const ComparisonService = require('../services/comparison-service');
const ParsingService = require('../services/parsing-service');

let citiesWithBroadbandSpeeds;
ParsingService.parseCSV('broadband.csv')
  .then((data) => citiesWithBroadbandSpeeds = data);

const getDataForCity = (city) => {
  return new Promise((resolve, reject) => {
    const cityWithSpeed = citiesWithBroadbandSpeeds.find((c) => c.city === city);
    let speed = "n/a";
    let rating = "n/a";
    if (cityWithSpeed) {
      speed = cityWithSpeed.speed;
      rating = ComparisonService.compare(citiesWithBroadbandSpeeds, speed, 'speed', 15);
    }
    resolve({ speed, rating });
  })
};

module.exports.getDataForCity = getDataForCity;
