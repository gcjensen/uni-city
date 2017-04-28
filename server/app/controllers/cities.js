'use strict';

const express = require('express');
const router = express.Router();
const City = require('../models/city');

router.get('/cities', getCityList);
router.get('/all-data/all-cities', getAllCitiesWithAllData);

function getCityList(req, res, next) {
  res.send(City.getCityList())
}

function getAllCitiesWithAllData(req, res, next) {
  res.send(City.getAllCitiesWithAllData());
}

module.exports = router;
