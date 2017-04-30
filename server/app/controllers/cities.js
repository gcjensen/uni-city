'use strict';

const express = require('express');
const router = express.Router();
const City = require('../models/city');
const Rent = require('../models/rent');
const Nightlife = require('../models/nightlife');
const Broadband = require('../models/broadband');
const Crime = require('../models/crime');

router.get('/cities', (req, res) => res.send(City.getCityList()));
router.get('/all-data/all-cities', getAllCitiesWithAllData);
router.get('/all-data/:city', (req, res) => getCityWithAllData(req, (response) => res.send(response)));

module.exports = router;

/*
 * When adding a new datasource, add it to one of the objects here,
 * depending on whether the data retrieval is synchronous or not.
 *
 */
const syncDataSources = { "rent": Rent, "broadband": Broadband, "crimeData": Crime };
const asyncDataSources = { "nightlife": Nightlife };

function getCityWithAllData(req, callback) {
  const city = req.params.city.replace(/\b\w/g, l => l.toUpperCase());
  if (!City.doesCityExist(city)) res.send({ status: 404, message: 'Invalid city'});
  else {
    let response = { city };
    const promises = []; // used to keep track of the async data retrievals
    performSynchronousDataRetrieval(syncDataSources, response, city);
    performAsynchronousDataRetrieval(asyncDataSources, promises, response, city)
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

function performSynchronousDataRetrieval(dataSources, response, city) {
  for (let key in dataSources) {
    response[key] = dataSources[key].getDataForCity(city);
  }
}

function performAsynchronousDataRetrieval(dataSources, promises, response, city) {
  for (let key in dataSources) {
    // push each new promise onto the array, so we can keep track of them
    promises.push(new Promise((resolve, reject) => {
      dataSources[key].getDataForCity(city)
        .then((data) => {
          response[key] = data
          resolve(); // signally this async data retrieval has finished
        });
    }));
  }
}
