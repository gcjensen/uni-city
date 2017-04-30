'use strict';

const ParsingService = require('../services/parsing-service');

let cities;
ParsingService.parseCSV('cities.csv')
  .then((data) => cities = data);

const getCityList = () => {
  return cities;
};

// cities.csv controls which cities are valid
const doesCityExist = (city) => {
  return cities.map((c) => c.name).includes(city);
}

module.exports.getCityList = getCityList;
module.exports.doesCityExist = doesCityExist;
