'use strict';

const ParsingService = require('../services/parsing-service');
const PartService = require('../services/part-service');

let cities;
ParsingService.parseCSV('cities.csv')
  .then((data) => { cities = data; parseStudentPopulations() });

let cityStudentPopulations;

const parseStudentPopulations = () => {
	ParsingService.parseCSV('university-population.csv')
	  .then((data) => cityStudentPopulations = mapUniversityPopulationsToCities(data));
}

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

const mapUniversityPopulationsToCities = (universityPopulations) => {
  const cityStudentPopulations = [];
  for (let city of getCityList()) {
    let studentsInCity = PartService.filterData(city.name, universityPopulations, "universities", "university");
    studentsInCity = studentsInCity.filter((c) => !isNaN(c['population']));
   	studentsInCity = studentsInCity.map((d) => d['population']);
    let totalPopulation = studentsInCity.reduce((a, b) => (parseInt(a) + parseInt(b)), 0);
    cityStudentPopulations.push({ city: city.name, population: totalPopulation });
  }
  return cityStudentPopulations;
}

const getStudentPopulationForCity = (city) => {
	return cityStudentPopulations.filter((c) => c.city == city)[0]['population'];
};

module.exports.getCityList = getCityList;
module.exports.doesCityExist = doesCityExist;
module.exports.getCity = getCity;
module.exports.getStudentPopulationForCity = getStudentPopulationForCity;