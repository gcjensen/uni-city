// For use with data that is for 'parts' of a city. 
// This service will use a provided type (partType) to get a list of all 'parts' in that city
// It can then filter a data set, so that only parts from the given city is included

// This can be used for data which is split by
//    * constituency - partType = constituencies
//    * university - partType = universities
const ParsingService = require('../services/parsing-service');

let constituencies;
ParsingService.parseCSV('constituencies.csv')
  .then((data) => constituencies = data);
let universities;
ParsingService.parseCSV('universities.csv')
  .then((data) => universities = data);

function filterData(city, data, partType, partProp) {
	let parts = constituencies;
	if( partType == "universities" ) 
		parts = universities;
	let partsForCity = findPartsForCity(parts, city);
	return data.filter((c) => partsForCity.includes(c[partProp]));
}

function findPartsForCity(parts, city) {
  let results = parts.filter((c) => c.city === city);
  return results.map((r) => r.name);
}

module.exports.filterData = filterData;
