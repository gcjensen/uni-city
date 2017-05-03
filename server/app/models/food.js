'use strict';

const ComparisonService = require('../services/comparison-service');
const ParsingService = require('../services/parsing-service');
const RegionService = require('../services/region-service');

let regionsWithFoodData;
ParsingService.parseCSV('food.csv')
  .then((data) => regionsWithFoodData = data);

const getDataForCity = (city) => {
  return new Promise((resolve, reject) => {
    const regionObj = RegionService.filterByRegion(city, regionsWithFoodData)[0];
    const region = regionObj['region'];
    let foodAverage = parseFloat(regionObj['food and non-alcoholic drinks']) / parseFloat(regionObj['average persons per household']);
    let narcoticAverage = parseFloat(regionObj['alcoholic drink, tobacco and narcotics']) / parseFloat(regionObj['average persons per household']);

    const foodRating = ComparisonService.compareEnglandPropDivision(regionsWithFoodData, foodAverage, 'food and non-alcoholic drinks', 90, 'region', 'average persons per household');
    const narcoticRating = ComparisonService.compareEnglandPropDivision(regionsWithFoodData, narcoticAverage, 'alcoholic drink, tobacco and narcotics', 90, 'region', 'average persons per household');

    foodAverage = Math.round(foodAverage * 100) / 100
    narcoticAverage = Math.round(narcoticAverage * 100) / 100

    resolve({ region, foodAverage, foodRating, narcoticAverage, narcoticRating });
  });
};

const getRegionList = () => {
  return regionsWithFoodData;
};


module.exports.getDataForCity = getDataForCity;
module.exports.getRegionList = getRegionList;
