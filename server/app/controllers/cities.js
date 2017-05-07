'use strict';

const express = require('express');
const router = express.Router();
const City = require('../models/city');
const DataSources = require('../../config/data-sources');

router.get('/cities', (req, res) => res.send(City.getCityList()));
router.get('/all-data/all-cities', getAllCitiesWithAllData);
router.get('/all-data/:city', (req, res) =>
       getCityWithAllData(req, (response) => res.send(response)));

module.exports = router;

function getCityWithAllData(req, callback) {
  const city = req.params.city.replace(/\b\w/g, l => l.toUpperCase());
  if (!City.doesCityExist(city)) res.send({ status: 404, message: 'Invalid city'});
  else {
    const cityObj = City.getCity(city);
    const description = cityObj.description;
    const region = cityObj.region;
    const wikipedia = cityObj.wikipedia;
    const population = cityObj.population;

    let response = { city, description, region, wikipedia, population };
    const promises = []; // used to keep track of the async data retrievals

    for (let key in DataSources) {
      // push each new promise onto the array, so we can keep track of them
      promises.push(new Promise((resolve, reject) => {
        DataSources[key].getDataForCity(city)
          .then((data) => {
            response[key] = data
            resolve();
          });
      }));
    }
    // waiting for all the async data retrievals to finish
    Promise.all(promises).then(() => callback(response));
  }
}

function getAllCitiesWithAllData(req, res, next) {
  const promises = []; // used to keep track of the async data retrievals
  let responses = [];
  for (let city of City.getCityList()) {
    // push each new promise onto the array, so we can keep track of them
    promises.push(new Promise((resolve, reject) => {
      getCityWithAllData({params:{city: city.name}}, (response) => {
        responses.push(response);
        resolve(); // signally this async action has finished
      })
    }));
  }
  // waiting for all the async data retrievals to finish
  Promise.all(promises).then(() => res.send(responses));
}
