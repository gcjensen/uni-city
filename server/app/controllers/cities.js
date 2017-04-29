'use strict';

const express = require('express');
const router = express.Router();
const City = require('../models/city');
const Rent = require('../models/rent');
const Nightlife = require('../models/nightlife');

router.get('/cities', getCityList);
router.get('/all-data/all-cities', getAllCitiesWithAllData);
router.get('/all-data/:city', getCityWithAllData);

module.exports = router;

/**************** Private Implementation ****************/

// Is this too much logic in the controller?
// Should these be extracted into a service?

function getCityList(req, res, next) {
  res.send(City.getCityList())
}

function getCityWithAllData(req, res, next) {
  const city = req.params.city.replace(/\b\w/g, l => l.toUpperCase());
  if (!City.doesCityExist(city)) res.send({ status: 404, message: 'Invalid city'});
  else {
    const rent = Rent.getRentForCity(city);
    Nightlife.getNightlifeRating(city)
      .then((nightlife) => res.send({ city, rent, nightlife }));
  }
}

// too similar to getNightlifeRatingForAllCities,
// but I'm not sure how to reuse...
function getAllCitiesWithAllData(req, res, next) {
  const promises = [];
  for (let city of City.getCityList()) {
    promises.push(new Promise((resolve, reject) => {
      const rent = Rent.getRentForCity(city);
      Nightlife.getNightlifeRating(city)
        .then((nightlife) => resolve({ city, rent, nightlife }));
    }));
  }
  Promise.all(promises).then((response) => {
    res.send(response);
  });
}
