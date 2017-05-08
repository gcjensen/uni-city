const chai     = require('chai');
const expect   = chai.expect;
const chaiHttp = require('chai-http');
const server   = require('../../server');
const should   = chai.should();

chai.use(chaiHttp);
describe('Wages (end-to-end)', () => {

  it('it should /GET the wage data for the specified available city', (done) => {
    chai.request(server)
        .get('/api/wages/southampton')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.all.keys(['city', 'wages']);
            res.body.city.should.be.a('string');
            const expectedKeys = ['averageWage', 'rating'];
            res.body.wages.should.have.all.keys(expectedKeys);
            for (let key of expectedKeys) res.body.wages[key].should.be.a('number');
            res.body.wages.rating.should.be.within(0, 10);
            done();
        });
  });

  it('it should /GET the wages data for all available cities', (done) => {
    chai.request(server)
        .get('/api/wages/all-cities')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
            for (let element of res.body) {
              element.should.be.an('object');
              element.should.have.all.keys(['city', 'wages']);
              element.city.should.be.a('string');
              const expectedKeys = ['averageWage', 'rating'];
              element.wages.should.have.all.keys(expectedKeys);
              for (let key of expectedKeys) element.wages[key].should.be.a('number');
              element.wages.rating.should.be.within(0, 10);
            }
            done();
        });
  });

  it('it should return a 404 if the requested city is unavailable', (done) => {
    chai.request(server)
        .get('/api/wages/copenhagen')
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.all.keys(['error']);
            done();
        });
  });

});
