const chai     = require('chai');
const expect   = chai.expect;
const chaiHttp = require('chai-http');
const server   = require('../../server');
const should   = chai.should();

chai.use(chaiHttp);
describe('Crime (end-to-end)', () => {

  it('it should /GET the crime data for the specified available city', (done) => {
    chai.request(server)
        .get('/api/crime/southampton')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.all.keys(['city', 'crimeData']);
            res.body.city.should.be.a('string');
            const expectedKeys = ['robbery', 'burglary', 'violenceAndSexualOffences', 'total', 'rating'];
            res.body.crimeData.should.have.all.keys(expectedKeys);
            for (let key of expectedKeys) res.body.crimeData[key].should.be.a('number');
            res.body.crimeData.rating.should.be.within(0, 10);
            done();
        });
  });

  it('it should /GET the crime data for all available cities', (done) => {
    chai.request(server)
        .get('/api/crime/all-cities')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
            for (let element of res.body) {
              element.should.be.an('object');
              element.should.have.all.keys(['city', 'crimeData']);
              element.city.should.be.a('string');
              const expectedKeys = ['robbery', 'burglary', 'violenceAndSexualOffences', 'total', 'rating'];
              element.crimeData.should.have.all.keys(expectedKeys);
              for (let key of expectedKeys) element.crimeData[key].should.be.a('number');
              element.crimeData.rating.should.be.within(0, 10);
            }
            done();
        });
  });

  it('it should return a 404 if the requested city is unavailable', (done) => {
    chai.request(server)
        .get('/api/crime/copenhagen')
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.all.keys(['error']);
            done();
        });
  });

});
