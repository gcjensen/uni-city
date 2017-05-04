'use strict';

const RatingService = require('../services/rating-service');
const ParsingService = require('../services/parsing-service');
const RegionService = require('../services/region-service');
const City = require('../models/city');

let regionsWithFoodData;
let citiesWithFoodData;
ParsingService.parseCSV('food.csv')
  .then((data) => {
    regionsWithFoodData = data;
    citiesWithFoodData = mapRegionDataToCities(data)
  });

const mapRegionDataToCities = (regionsWithFoodData) => {
  const citiesWithFoodData = [];
  for (let city of City.getCityList()) {
    const regionObj = RegionService.filterByRegion(city.name, regionsWithFoodData)[0];
    const region = regionObj['region'];
    let foodAverage = parseFloat(regionObj['food and non-alcoholic drinks']) / parseFloat(regionObj['average persons per household']);
    let narcoticAverage = parseFloat(regionObj['alcoholic drink, tobacco and narcotics']) / parseFloat(regionObj['average persons per household']);
    citiesWithFoodData.push({ city: city.name, foodAverage, narcoticAverage });
  }
  return citiesWithFoodData;
}


const getDataForCity = (city) => {
  return new Promise((resolve, reject) => {
    let { foodAverage, narcoticAverage } = citiesWithFoodData.find((c) => c.city === city);

    const foodRating = RatingService.rate(citiesWithFoodData, foodAverage, 'foodAverage');
    const narcoticRating = RatingService.rate(citiesWithFoodData, narcoticAverage, 'narcoticAverage');

    foodAverage = Math.round(foodAverage * 100) / 100
    narcoticAverage = Math.round(narcoticAverage * 100) / 100

    resolve({ foodAverage, foodRating, narcoticAverage, narcoticRating });
  });
};

const getRegionList = () => {
  return regionsWithFoodData;
};


module.exports.getDataForCity = getDataForCity;
module.exports.getRegionList = getRegionList;
