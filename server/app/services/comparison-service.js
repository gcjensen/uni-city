/*
 * Simple rent 'rating' function - needs to be improved
 * percentageAllowance determines the range for which a
 * value will be considered 'average'.
 */
function compare(allData, data, prop, percentageAllowance = 10) {

  let allValuesForProp = allData.map((d) => d[prop]);
  allValuesForProp = allValuesForProp.filter((d) => !isNaN(d));
  let total = allValuesForProp.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  let average = total / allValuesForProp.length;

  return comparisonFunction(data, average, percentageAllowance);
}

function compareEnglandProp(allData, data, prop, percentageAllowance = 10, englandProp) {
  const average = allData.find((c) => c[englandProp] === 'England')[prop];
  return comparisonFunction(data, average, percentageAllowance);
}

function compareEnglandPropDivision(allData, data, prop, percentageAllowance = 10, englandProp, divider) {
  const englandData = allData.find((c) => c[englandProp] === 'England');
  const average = parseFloat(englandData[prop]) / parseFloat(englandData[divider]);
  return comparisonFunction(data, average, percentageAllowance);
}

function comparisonFunction(data, average, percentageAllowance) {
  if (data < (average + average/percentageAllowance) && data > (average - average/percentageAllowance))
    return 'About average';
  if (data < average) return 'Below average';
  if (data > average) return 'Above average';

}


module.exports.compare = compare;
module.exports.compareEnglandProp = compareEnglandProp;
module.exports.compareEnglandPropDivision = compareEnglandPropDivision;