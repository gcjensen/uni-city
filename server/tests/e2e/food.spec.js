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
            res.body.should.have.all.keys(['city', 'food']);
            res.body.city.should.be.a('string');
            const expectedKeys = ['foodAverage', 'foodRating', 'narcoticAverage', 'narcoticRating'];
            res.body.food.should.have.all.keys(expectedKeys);
            for (let key of expectedKeys) res.body.food[key].should.be.a('number');
            res.body.food.foodRating.should.be.within(0, 10);
            res.body.food.narcoticRating.should.be.within(0, 10);
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
              element.should.have.all.keys(['city', 'food']);
              element.city.should.be.a('string');
              const expectedKeys = ['foodAverage', 'foodRating', 'narcoticAverage', 'narcoticRating'];
              element.food.should.have.all.keys(expectedKeys);
              for (let key of expectedKeys) element.food[key].should.be.a('number');
              element.food.foodRating.should.be.within(0, 10);
              element.food.narcoticRating.should.be.within(0, 10);
            }
            done();
        });
  });

  it('it should return a 404 if the requested city is unavailable', (done) => {
    chai.request(server)
        .get('/api/food/copenhagen')
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.all.keys(['error']);
            done();
        });
  });

});
