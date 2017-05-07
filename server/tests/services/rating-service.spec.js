const RatingService = require('../../app/services/rating-service');
const expect        = require("chai").expect;

describe('Rating Service', () => {

  const cities = ['Southampton', 'London', 'Bristol', 'Oxford', 'Cambridge', 'York'];
  const allData = []
  for (let i in cities) {
    allData.push({city: cities[i], value: i * 10})
  }

  it('should rate a data point out of 10 relative to other data (when a HIGH value is good)', (done) => {
    const rating = RatingService.rate(allData, 42, 'value', false);
    expect(rating).to.equal(8.4);
    done();
  });

  it('should rate a data point out of 10 relative to other data (when a LOW value is good)', (done) => {
    const rating = RatingService.rate(allData, 12, 'value');
    expect(rating).to.equal(7.6);
    done();
  });

});
