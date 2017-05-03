// For use with data that is sorted by constituencies, not city
// Use to filter data to only get the constituencies within a given city
const ParsingService = require('../services/parsing-service');

let constituencies;
ParsingService.parseCSV('constituencies.csv')
  .then((data) => constituencies = data );

function filterByConstituencies(city, data) {
	let constituencies = findConstituencies(city);

	return data.filter((c) => constituencies.includes(c.Code));
}

function findConstituencies(city) {
  let results = constituencies.filter((c) => c.City === city);
  return results.map(function(a) {return a.Code;});
}

module.exports.findConstituencies = findConstituencies;
module.exports.filterByConstituencies = filterByConstituencies;