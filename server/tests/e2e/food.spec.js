const chai     = require('chai');
const expect   = chai.expect;
const chaiHttp = require('chai-http');
const server   = require('../../server');
const should   = chai.should();

chai.use(chaiHttp);
describe('Food (end-to-end)', () => {

  it('it should /GET the food data for the specified available city', (done) => {
    chai.request(server)
        .get('/api/food/southampton')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('city').that.is.an('string');
            res.body.should.have.deep.property('food.foodAverage').that.is.an('number');
            res.body.should.have.deep.property('food.foodRating').that.is.an('number');
            res.body.should.have.deep.property('food.narcoticAverage').that.is.an('number');
            res.body.should.have.deep.property('food.narcoticRating').that.is.an('number');
            res.body.food.foodRating.should.be.within(0, 10);
            done();
        });
  });

  it('it should /GET the food data for all available cities', (done) => {
    chai.request(server)
        .get('/api/food/all-cities')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
            for (let element of res.body) {
              element.should.be.an('object');
              element.should.have.property('city').that.is.an('string');
              element.should.have.deep.property('food.foodAverage').that.is.an('number');
              element.should.have.deep.property('food.foodRating').that.is.an('number');
              element.should.have.deep.property('food.narcoticAverage').that.is.an('number');
              element.should.have.deep.property('food.narcoticRating').that.is.an('number');
              element.food.foodRating.should.be.within(0, 10);
            }
            done();
        });
  });

});
