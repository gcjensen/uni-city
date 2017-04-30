'use strict';

const express = require('express');
const router = express.Router();
const Rent = require('../models/rent');
const DataService = require('../services/data-service');

router.get('/rent/all-cities', (req, res) => DataService.getDataForAllCities(res, Rent, "rent"));
router.get('/rent/:city', (req, res) => DataService.getDataForCity(req, res, Rent, "rent"));

module.exports = router;
