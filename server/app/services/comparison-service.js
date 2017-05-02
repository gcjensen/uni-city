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

  if (data < (average + average/percentageAllowance) && data > (average - average/percentageAllowance))
    return 'About average';
  if (data < average) return 'Below average';
  if (data > average) return 'Above average';
}

module.exports.compare = compare;
