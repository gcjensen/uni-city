'use strict';

const RatingService = require('../services/rating-service');
const ParsingService = require('../services/parsing-service');
const PartService = require('../services/part-service');
const City = require('../models/city');

let citiesWithCrimeData;

const doInitialParsing = () => {
  return new Promise((resolve, reject) => {
    ParsingService.parseCSV('crime.csv').then((data) => {
      citiesWithCrimeData = mapUniversitiesToCities(data);
      resolve();
    });
  });
}

const mapUniversitiesToCities = (universityCrimeData) => {
  const citiesWithCrimeData = [];
  for (let city of City.getCityList()) {
    let cityCrimeDataByUnis = PartService.filterData(city.name, universityCrimeData, "universities", "university");
    let robbery = Math.round((cityCrimeDataByUnis.map((d) => d['robbery'])
                  .reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / cityCrimeDataByUnis.length) * 100) / 100;
    let burglary = Math.round((cityCrimeDataByUnis.map((d) => d['burglary'])
                  .reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / cityCrimeDataByUnis.length) * 100) / 100;
    let violenceAndSexualOffences = Math.round((cityCrimeDataByUnis.map((d) => d['violenceAndSexualOffences'])
                  .reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / cityCrimeDataByUnis.length) * 100) / 100;
    const total = Math.round((robbery + burglary + violenceAndSexualOffences) * 100) / 100;

    citiesWithCrimeData.push({ city: city.name, crimeData: { robbery, burglary, violenceAndSexualOffences, total } });
  }
  return citiesWithCrimeData;
}

const getDataForCity = (city) => {
  return new Promise((resolve, reject) => {
    const crimeData = citiesWithCrimeData.find((c) => c.city === city).crimeData;
    const citiesWithTotalCrime = [];
    for (let cityWithCrimeData of citiesWithCrimeData) {
      citiesWithTotalCrime.push({
        city: cityWithCrimeData.city,
        total: cityWithCrimeData.crimeData.total
      });
    }
    crimeData.rating = RatingService.rate(citiesWithTotalCrime, crimeData.total, 'total');
    resolve(crimeData);
  });
};

module.exports.doInitialParsing = doInitialParsing;
module.exports.getDataForCity = getDataForCity;
