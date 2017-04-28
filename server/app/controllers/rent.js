'use strict';

const express = require('express');
const router = express.Router();
const Rent = require('../models/rent');
const City = require('../models/city');

router.get('/rent/all-cities', getRentForAllCities);
router.get('/rent/:city', getRentForCity);

module.exports = router;

/**************** Private Implementation ****************/

function getRentForCity(req, res, next) {
  const city = req.params.city.replace(/\b\w/g, l => l.toUpperCase());
  if (!City.doesCityExist(city)) res.send({ status: 404, message: 'Invalid city'});
  else {
    const rent = Rent.getRentForCity(city);
    res.send({ city, rent });
  }
}

function getRentForAllCities(req, res, next) {
  const citiesWithRent = [];
  for (let city of City.getCityList()) {
    const rent = Rent.getRentForCity(city);
    citiesWithRent.push({ city, rent});
  }
  res.send(citiesWithRent);
}
