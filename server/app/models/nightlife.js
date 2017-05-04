'use strict';

const fs  = require('fs');
const GooglePlaces = require('node-googleplaces');

let key;
readInKey();

const getDataForCity = (city) => {

  return new Promise((resolve, reject) => {

    // const places = new GooglePlaces(key);
    // const params = {
    //   query: `nightclub in ${city}`
    // };
    // places.textSearch(params, (err, response) => {
    //   let ratings = response.body.results.map((r) => r.rating);
    //   ratings = ratings.filter((r) => !isNaN(r));
    //   let totalRating = ratings.reduce((a, b) => a + b, 0);
    //   let averageRating = totalRating / ratings.length
    //   averageRating = Math.round(averageRating * 100) / 100;
    //   resolve({ rating: averageRating });
    // });

    /*
     * the above is commented out to avoid exceeding Google API Limits.
     * For testing, a random number between 3.0 and 4.5 is generated
     */

    resolve({ rating: (Math.floor(Math.random() * 15) + 30)/ 5})
  });
};

module.exports.getDataForCity = getDataForCity;

function readInKey() {
  fs.readFile('./server/config/google-places-api-key.txt', (err, data) => {
      if (err) throw err;
      key = data.toString();
  });
}
