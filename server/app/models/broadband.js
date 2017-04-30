'use strict';

const fs  = require('fs');
const csv = require('csvtojson');

// parse rent csv file on load so it's ready for subseqent requests
let citiesWithBroadbandSpeeds;
parseBroadbandSpeeds();

const getBroadbandSpeedForCity = (city) => {
  const cityWithSpeed = citiesWithBroadbandSpeeds.find((c) => c.city === city);
  let speed = "n/a";
  let rating = "n/a";
  if (cityWithSpeed) {
    speed = cityWithSpeed.speed;
    rating = compareSpeed(speed);
  }
  return { speed, rating };
};

module.exports.getBroadbandSpeedForCity = getBroadbandSpeedForCity;

/**************** Private Implementation ****************/

function parseBroadbandSpeeds() {
  const csvFilePath = './server/data/broadband.csv';
  let broadbandSpeeds = [];
  csv()
    .fromFile(csvFilePath)
    .on('json',(obj) => {
        broadbandSpeeds.push(obj);
    })
    .on('done',(error)=>{
        citiesWithBroadbandSpeeds = broadbandSpeeds;
    });
}

// Simple rent 'rating' function - needs to be improved
function compareSpeed(rent) {

  let allSpeeds = citiesWithBroadbandSpeeds.map((c) => c.speed);
  allSpeeds = allSpeeds.filter((r) => !isNaN(r));
  let totalSpeed = allSpeeds.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  let averageSpeed = totalSpeed / allSpeeds.length;

  if (rent < averageSpeed) return 'Below Average';
  if (rent > averageSpeed) return 'Above Average';
  if (rent === averageSpeed) return 'Average';
}
