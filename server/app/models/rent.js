'use strict';

const fs  = require('fs');
const csv = require('csvtojson');

// parse rent csv file on load so it's ready for subseqent requests
let citiesWithRent;
parseRents();

const getRentForCity = (city) => {
  const rent = citiesWithRent.find((c) => c.area === city);
  const { median, mean } = rent;
  const rating = compareRentAmount(median);
  return { median, mean, rating };
};

module.exports.getRentForCity = getRentForCity;

/**************** Private Implementation ****************/

function parseRents() {
  const csvFilePath = './server/data/rent.csv';
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
function compareRentAmount(rent) {

  const averageRent = citiesWithRent.find((c) => c.area === 'England').median;
  if (rent < averageRent) return 'Below Average';
  if (rent > averageRent) return 'Above Average';
  if (rent === averageRent) return 'Average';
}
