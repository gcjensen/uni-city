const RegionService = require('../../app/services/region-service');
const expect        = require("chai").expect;

describe('Region Service', () => {

  it('should match a city to its region', (done) => {
    const region = RegionService.filterByRegion('Southampton', [{'region': 'South West'}, {'region': 'South East'}, {'region': 'North East'}]);
    expect(region).to.deep.equal([{'region': 'South East'}]);
    done();
  }); 

});
