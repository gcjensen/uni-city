'use strict';

const express = require('express');
const router = express.Router();
const Nightlife = require('../models/nightlife');
const City = require('../models/city');

router.get('/nightlife/all-cities', getNightlifeRatingForAllCities);
router.get('/nightlife/:city', getNightlifeRating);

module.exports = router;

/**************** Private Implementation ****************/

// Is this too much logic in the controller?
// Should these be extracted into a service?

function getNightlifeRating(req, res, next) {
  const city = req.params.city.replace(/\b\w/g, l => l.toUpperCase());
  Nightlife.getNightlifeRating(city)
    .then((nightlife) => res.send({ city, nightlife }));
}

// too similar to getAllCitiesWithAllData,
// but I'm not sure how to reuse...
function getNightlifeRatingForAllCities(req, res, next) {
  const promises = [];
  for (let city of City.getCityList()) {
    promises.push(new Promise((resolve, reject) => {
      Nightlife.getNightlifeRating(city)
        .then((nightlife) => resolve({ city, nightlife }));
    }));
  }
  Promise.all(promises).then((response) => {
    res.send(response);
  });
}
