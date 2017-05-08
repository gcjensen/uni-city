const chai     = require('chai');
const expect   = chai.expect;
const chaiHttp = require('chai-http');
const server   = require('../../server');
const should   = chai.should();

chai.use(chaiHttp);
describe('Cities (end-to-end)', () => {

  it('it should /GET the list of available cities', (done) => {
    chai.request(server)
        .get('/api/cities')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
            for (let element of res.body) {
               element.should.be.an('object');
               const expectedKeys = ['name', 'region', 'description', 'wikipedia', 'population'];
               element.should.have.all.keys(expectedKeys);
               for (let key of expectedKeys) element[key].should.be.a('string');
            }
            done();
        });
  });

  it('it should /GET all the available data for the specified city', (done) => {
    chai.request(server)
        .get('/api/all-data/southampton')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.all.keys(['city', 'region', 'description', 'wikipedia', 'population', 'broadband', 'crimeData', 'food', 'nightlife', 'rent', 'studentPopulation', 'wages']);

            res.body.rent.should.have.all.keys(['median', 'mean', 'rating']);
            res.body.crimeData.should.have.all.keys(['robbery', 'burglary', 'violenceAndSexualOffences', 'total', 'rating']);
            res.body.nightlife.should.have.all.keys(['rating', 'topClubs']);
            res.body.broadband.should.have.all.keys(['speed', 'rating']);
            res.body.wages.should.have.all.keys(['averageWage', 'rating']);
            res.body.food.should.have.all.keys(['foodAverage', 'foodRating', 'narcoticAverage', 'narcoticRating']);

            res.body.rent.rating.should.be.within(0, 10);
            res.body.crimeData.rating.should.be.within(0, 10);
            res.body.nightlife.rating.should.be.within(0, 10);
            res.body.broadband.rating.should.be.within(0, 10);
            res.body.wages.rating.should.be.within(0, 10);
            res.body.food.foodRating.should.be.within(0, 10);

            done();
        });
  });

  it('it should return a 404 if the requested city is unavailable', (done) => {
    chai.request(server)
        .get('/api/all-data/copenhagen')
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.all.keys(['error']);
            done();
        });
  });

});
