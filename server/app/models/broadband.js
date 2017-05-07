'use strict';

const RatingService = require('../services/rating-service');
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
      speed = parseFloat(cityWithSpeed.speed);
      rating = RatingService.rate(citiesWithBroadbandSpeeds, speed, 'speed', false);
    }
    resolve({ speed, rating });
  })
};

module.exports.getDataForCity = getDataForCity;
