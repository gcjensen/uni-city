'use strict';

const express = require('express');
const router = express.Router();
const Nightlife = require('../models/nightlife');
const DataService = require('../services/data-service');

router.get('/nightlife/all-cities', (req, res) => DataService.getAsyncDataForAllCities(res, Nightlife, "nightlife"));
router.get('/nightlife/:city', (req, res) => DataService.getAsyncDataForCity(req, res, Nightlife, "nightlife"));

module.exports = router;
