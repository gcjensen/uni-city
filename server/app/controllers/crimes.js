'use strict';

const express = require('express');
const router = express.Router();
const Crime = require('../models/crime');
const DataService = require('../services/data-service');

router.get('/crime/all-cities', (req, res) => DataService.getDataForAllCities(res, Crime, "crimeData"));
router.get('/crime/:city', (req, res) => DataService.getDataForCity(req, res, Crime, "crimeData"));

module.exports = router;
