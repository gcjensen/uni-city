const chai     = require('chai');
const expect   = chai.expect;
const chaiHttp = require('chai-http');
const server   = require('../../server');
const should   = chai.should();

chai.use(chaiHttp);
describe('Nightlife (end-to-end)', () => {

  it('it should /GET the nightlife data for the specified available city', (done) => {
    chai.request(server)
        .get('/api/nightlife/southampton')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.all.keys(['city', 'nightlife']);
            res.body.city.should.be.a('string');
            res.body.nightlife.should.have.all.keys(['rating', 'topClubs']);
            res.body.nightlife.rating.should.be.a('number');
            res.body.nightlife.topClubs.should.have.lengthOf(4);
            res.body.nightlife.rating.should.be.within(0, 10);
            done();
        });
  });

  it('it should /GET the nightlife data for all available cities', (done) => {
    chai.request(server)
        .get('/api/nightlife/all-cities')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
            for (let element of res.body) {
              element.should.be.an('object');
              element.should.have.all.keys(['city', 'nightlife']);
              element.city.should.be.a('string');
              element.nightlife.should.have.all.keys(['rating', 'topClubs']);
              element.nightlife.rating.should.be.a('number');
              element.nightlife.topClubs.should.have.lengthOf(4);
              element.nightlife.rating.should.be.within(0, 10);
            }
            done();
        });
  });

  it('it should return a 404 if the requested city is unavailable', (done) => {
    chai.request(server)
        .get('/api/nightlife/copenhagen')
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.all.keys(['error']);
            done();
        });
  });

});
