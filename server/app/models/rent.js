'use strict';

const fs  = require('fs');
const csv = require('csvtojson');

// parse rent csv file on load so it's ready for subseqent requests
let citiesWithRent;
parseRents();

const getRentForCity = (city) => {
  const rent = citiesWithRent.find((c) => c.area === city);
  const { median, mean } = rent;
  const rating = rateRentAmount(median);
  return { median, mean, rating };
};

module.exports.getRentForCity = getRentForCity;

/**************** Private Implementation ****************/

function parseRents() {
  const csvFilePath = './server/data/england-rent.csv';
  let cities = [];
  csv()
    .fromFile(csvFilePath)
    .on('json',(cityObject) => {
        cities.push(cityObject);
    })
    .on('done',(error)=>{
        citiesWithRent = cities;
    });
}

// Simple rent 'rating' function - needs to be improved
function rateRentAmount(rent) {
  let allRent = citiesWithRent.map((c) => c.median);
  allRent = allRent.filter((r) => !isNaN(r));
  let totalRent = allRent.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  let averageRent = totalRent / allRent.length;

  averageRent = citiesWithRent.find((c) => c.area === 'England').median;
  if (rent < averageRent) return 'Below Average';
  if (rent > averageRent) return 'Above Average';
  if (rent === averageRent) return 'Average';
}
