'use strict';

const express = require('express');
const router = express.Router();
const wages = require('../models/wage');
const DataService = require('../services/data-service');

router.get('/wages/all-cities', (req, res) => DataService.getDataForAllCities(res, wages, "wages"));
router.get('/wages/:city', (req, res) => DataService.getDataForCity(req, res, wages, "wages"));

module.exports = router;
