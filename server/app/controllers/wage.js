'use strict';

const express = require('express');
const router = express.Router();
const Wage = require('../models/wage');
const DataService = require('../services/data-service');

router.get('/wage/all-cities', (req, res) => DataService.getDataForAllCities(res, Wage, "wage"));
router.get('/wage/:city', (req, res) => DataService.getDataForCity(req, res, Wage, "wage"));

module.exports = router;
