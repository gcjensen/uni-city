const City = require('../models/city');

const rate = (allData, data, prop, lowIsBetter = true) => {
  allData = allData.filter((c) => City.doesCityExist(c.city));
  let allValuesForProp = allData.map((d) => d[prop]);
  allValuesForProp = allValuesForProp.filter((d) => !isNaN(d));
  const score = computeRating(allValuesForProp, data);
  if (lowIsBetter) return Math.round((10 - score) * 10) / 10;
  else return Math.round(score * 10) / 10;
}

const computeRating = (allData, data) => {
  const max = Math.max.apply(null, allData)
  const min = Math.min.apply(null, allData);
  const bracket = (max - min) / 10;
  return (data - min) / bracket;
}

module.exports.rate = rate;
