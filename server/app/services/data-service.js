const City = require('../models/city');

function getDataForCity(req, res, Model, dataType) {
  const city = req.params.city.replace(/\b\w/g, l => l.toUpperCase());
  if (!City.doesCityExist(city)) res.send({ status: 404, message: 'Invalid city'});
  Model.getDataForCity(city)
    .then((data) => res.send({ city, [dataType]: data }));
}

function getDataForAllCities(res, Model, dataType) {
  const promises = [];
  for (let city of City.getCityList()) {
    promises.push(new Promise((resolve, reject) => {
      Model.getDataForCity(city.name)
        .then((data) => resolve({ city: city.name, [dataType]: data }));
    }));
  }
  Promise.all(promises).then((response) => {
    res.send(response);
  });
}

module.exports.getDataForCity = getDataForCity;
module.exports.getDataForAllCities = getDataForAllCities;
