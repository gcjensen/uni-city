'use strict';

const fs  = require('fs');
const csv = require('csvtojson');

let cities;
parseCityList();

const getCityList = () => {
  return cities;
};

// cities.txt controls which cities are valid
const doesCityExist = (city) => {
  return cities.includes(city);
}

module.exports.getCityList = getCityList;
module.exports.doesCityExist = doesCityExist;
// module.exports.getCityWithAllData = getCityWithAllData;
// module.exports.getAllCitiesWithAllData = getAllCitiesWithAllData;


/**************** Private Implementation ****************/

function parseCityList() {
  fs.readFile('./server/data/cities.txt', (err, data) => {
      if (err) throw err;
      let citiesWithPossibleWhiteSpace = data.toString().split("\n");
      cities = citiesWithPossibleWhiteSpace.filter((c) => c != "");
  });
}
