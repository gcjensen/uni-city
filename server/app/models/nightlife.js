'use strict';

const fs  = require('fs');
const GooglePlaces = require('node-googleplaces');

let key;
readInKey();

const getNightlifeRating = (city) => {

  return new Promise((resolve, reject) => {
    const places = new GooglePlaces(key);
    const params = {
      query: `nightclub in ${city}`
    };
    places.textSearch(params, (err, response) => {
      let ratings = response.body.results.map((r) => r.rating);
      ratings = ratings.filter((r) => !isNaN(r));
      let totalRating = ratings.reduce((a, b) => a + b, 0);
      let averageRating = totalRating / ratings.length
      averageRating = Math.round(averageRating * 100) / 100;
      resolve({ rating: averageRating });
    });
  });
};

module.exports.getNightlifeRating = getNightlifeRating;

/**************** Private Implementation ****************/

function readInKey() {
  fs.readFile('./server/config/google-places-api-key.txt', (err, data) => {
      if (err) throw err;
      key = data.toString();
  });
}
