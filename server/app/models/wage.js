'use strict';

const RatingService = require('../services/rating-service');
const ParsingService = require('../services/parsing-service');
const PartService = require('../services/part-service');
const City = require('../models/city');

let citiesWithWageData;

const doInitialParsing = () => {
  return new Promise((resolve, reject) => {
    ParsingService.parseCSV('wages.csv').then((data) => {
      citiesWithWageData = mapConstituencyDataToCities(data);
      resolve();
    });
  });
}

const mapConstituencyDataToCities = (constituencyWages) => {
  const citiesWithWageData = [];
  for (let city of City.getCityList()) {
    let constituencyWagesForCity = PartService.filterData(city.name, constituencyWages, "constituencies", "Description");
    constituencyWagesForCity = constituencyWagesForCity.filter((c) => !isNaN(c.Mean));
    constituencyWagesForCity = constituencyWagesForCity.map((d) => d['Mean']);
    let totalWage = constituencyWagesForCity.reduce((a, b) => (parseInt(a) + parseInt(b)), 0);
    let wage = Math.round(totalWage / constituencyWagesForCity.length);
    citiesWithWageData.push({ city: city.name, wage });
  }
  return citiesWithWageData;
}

const getDataForCity = (city) => {
  return new Promise((resolve, reject) => {
    const averageWage = citiesWithWageData.find((c) => c.city === city).wage;
    const rating = RatingService.rate(citiesWithWageData, averageWage, 'wage', false);
    resolve({ averageWage, rating });
  });
};

module.exports.doInitialParsing = doInitialParsing;
module.exports.getDataForCity = getDataForCity;
