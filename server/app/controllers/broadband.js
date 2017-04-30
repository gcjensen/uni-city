'use strict';

const express = require('express');
const router = express.Router();
const Broadband = require('../models/Broadband');
const City = require('../models/city');

router.get('/broadband/all-cities', getBroadbandSpeedForAllCities);
router.get('/broadband/:city', getBroadbandSpeedForCity);

module.exports = router;

/**************** Private Implementation ****************/

function getBroadbandSpeedForCity(req, res, next) {
  const city = req.params.city.replace(/\b\w/g, l => l.toUpperCase());
  if (!City.doesCityExist(city)) res.send({ status: 404, message: 'Invalid city'});
  else {
    const broadband = Broadband.getBroadbandSpeedForCity(city);
    res.send({ city, broadband });
  }
}

function getBroadbandSpeedForAllCities(req, res, next) {
  const citiesWithBroadbandSpeeds = [];
  for (let city of City.getCityList()) {
    const broadband = Broadband.getBroadbandSpeedForCity(city);
    citiesWithBroadbandSpeeds.push({ city, broadband });
  }
  res.send(citiesWithBroadbandSpeeds);
}
