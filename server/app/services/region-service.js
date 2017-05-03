// For use with data that is sorted by regions, not city
// Use to filter data to only get the region a city is within
const ParsingService = require('../services/parsing-service');
const City = require('../models/city');

function filterByRegion(city, data) {
	let cities = City.getCityList();
	cities = cities.filter((c) => c.name === city);
	return data.filter((c) => c.region == cities[0]['region']);
}

module.exports.filterByRegion = filterByRegion;