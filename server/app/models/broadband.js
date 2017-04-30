'use strict';

const ComparisonService = require('../services/comparison-service');
const ParsingService = require('../services/parsing-service');

let citiesWithBroadbandSpeeds;
ParsingService.parseCSV('broadband.csv')
  .then((data) => citiesWithBroadbandSpeeds = data);

const getDataForCity = (city) => {
  const cityWithSpeed = citiesWithBroadbandSpeeds.find((c) => c.city === city);
  let speed = "n/a";
  let rating = "n/a";
  if (cityWithSpeed) {
    speed = cityWithSpeed.speed;
    rating = ComparisonService.compare(citiesWithBroadbandSpeeds, speed, 'speed');
  }
  return { speed, rating };
};

module.exports.getDataForCity = getDataForCity;
