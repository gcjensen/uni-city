/*
 * Add new data sources here, with the key
 * set to what you would like the key to be
 * when the data is returned from the api.
 * e.g. {
 *        city: "Southampton",
 *        crimeData: { ... }
 *      }
 */
module.exports = {
  "rent": require('../app/models/rent'),
  "crimeData": require('../app/models/crime'),
  "nightlife": require('../app/models/nightlife'),
  "broadband": require('../app/models/broadband')
};
