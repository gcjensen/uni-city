const chai     = require('chai');
const expect   = chai.expect;
const chaiHttp = require('chai-http');
const server   = require('../../server');
const should   = chai.should();

chai.use(chaiHttp);
describe('Broadband (end-to-end)', () => {

  it('it should /GET the broadband data for the specified available city', (done) => {
    chai.request(server)
        .get('/api/broadband/southampton')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.all.keys(['city', 'broadband']);
            res.body.city.should.be.a('string');
            res.body.broadband.speed.should.be.a('number');
            res.body.broadband.rating.should.be.within(0, 10);
            done();
        });
  });

  it('it should /GET the broadband data for all available cities', (done) => {
    chai.request(server)
        .get('/api/broadband/all-cities')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
            for (let element of res.body) {
              element.should.be.an('object');
              element.should.have.all.keys(['city', 'broadband']);
              element.city.should.be.a('string');
              element.broadband.speed.should.be.a('number');
              element.broadband.rating.should.be.within(0, 10);
            }
            done();
        });
  });

  it('it should return a 404 if the requested city is unavailable', (done) => {
    chai.request(server)
        .get('/api/broadband/copenhagen')
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.all.keys(['error']);
            done();
        });
  });

});
