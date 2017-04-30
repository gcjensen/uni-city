// Simple rent 'rating' function - needs to be improved
function compare(allData, data, prop) {

  let allValuesForProp = allData.map((d) => d[prop]);
  allValuesForProp = allValuesForProp.filter((d) => !isNaN(d));
  let total = allValuesForProp.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  let average = total / allValuesForProp.length;

  if (data < average) return 'Below Average';
  if (data > average) return 'Above Average';
  if (data === average) return 'Average';
}

module.exports.compare = compare;
