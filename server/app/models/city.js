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

const getCity = (city) => {
	return cities.filter((c) => c.name == city)[0];
}

module.exports.getCityList = getCityList;
module.exports.doesCityExist = doesCityExist;
module.exports.getCity = getCity;