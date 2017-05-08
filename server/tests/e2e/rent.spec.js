const chai     = require('chai');
const expect   = chai.expect;
const chaiHttp = require('chai-http');
const server   = require('../../server');
const should   = chai.should();

chai.use(chaiHttp);
describe('Rent (end-to-end)', () => {

  it('it should /GET the rent data for the specified available city', (done) => {
    chai.request(server)
        .get('/api/rent/southampton')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.all.keys(['city', 'rent']);
            res.body.city.should.be.a('string');
            const expectedKeys = ['median', 'mean', 'rating'];
            res.body.rent.should.have.all.keys(expectedKeys);
            for (let key of expectedKeys) res.body.rent[key].should.be.a('number');
            res.body.rent.rating.should.be.within(0, 10);
            done();
        });
  });

  it('it should /GET the rent data for all available cities', (done) => {
    chai.request(server)
        .get('/api/rent/all-cities')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
            for (let element of res.body) {
              element.should.be.an('object');
              element.should.have.all.keys(['city', 'rent']);
              element.city.should.be.a('string');
              const expectedKeys = ['median', 'mean', 'rating'];
              element.rent.should.have.all.keys(expectedKeys);
              for (let key of expectedKeys) element.rent[key].should.be.a('number');
              element.rent.rating.should.be.within(0, 10);
            }
            done();
        });
  });

  it('it should return a 404 if the requested city is unavailable', (done) => {
    chai.request(server)
        .get('/api/rent/copenhagen')
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.all.keys(['error']);
            done();
        });
  });

});
