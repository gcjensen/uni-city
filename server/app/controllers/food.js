'use strict';

const express = require('express');
const router = express.Router();
const food = require('../models/food');
const DataService = require('../services/data-service');

router.get('/food/all-cities', (req, res) => DataService.getDataForAllCities(res, food, "food"));
router.get('/food/all-regions', (req, res) => res.send(food.getRegionList()));
router.get('/food/:city', (req, res) => DataService.getDataForCity(req, res, food, "food"));

module.exports = router;
