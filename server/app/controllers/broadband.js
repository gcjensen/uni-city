'use strict';

const express = require('express');
const router = express.Router();
const Broadband = require('../models/broadband');
const DataService = require('../services/data-service');

router.get('/broadband/all-cities', (req, res) => DataService.getDataForAllCities(res, Broadband, "broadband"));
router.get('/broadband/:city', (req, res) => DataService.getDataForCity(req, res, Broadband, "broadband"));

module.exports = router;
