const Broadband = require('../models/broadband');
const City = require('../models/city');
const Crime = require('../models/crime');
const Food = require('../models/food');
const Rent = require('../models/rent');
const Wage = require('../models/wage');

const startParsing = () => {
  City.doInitialParsing().then(() =>{
    Crime.doInitialParsing();
    Food.doInitialParsing();
    Wage.doInitialParsing();
  });
  Broadband.doInitialParsing();
  Rent.doInitialParsing();
}

module.exports.startParsing = startParsing;
