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
               element.should.have.property('name').that.is.an('string');
               element.should.have.property('region').that.is.an('string');
               element.should.have.property('description').that.is.an('string');
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
            res.body.should.have.property('city').that.is.an('string');
            res.body.should.have.property('description').that.is.an('string');
            res.body.should.have.property('region').that.is.an('string');

            const properties = ['rent.median', 'rent.mean', 'crimeData.robbery', 'crimeData.burglary', 'crimeData.violenceAndSexualOffences', 'crimeData.total', 'nightlife.rating', 'broadband.speed', 'wages.averageWage', 'food.foodAverage', 'food.narcoticAverage'];
            for (let property of properties) {
              res.body.should.have.deep.property(property).that.is.an('number');
            }

            res.body.rent.rating.should.be.within(0, 10);
            res.body.crimeData.rating.should.be.within(0, 10);
            res.body.nightlife.rating.should.be.within(0, 10);
            res.body.broadband.rating.should.be.within(0, 10);
            res.body.wages.rating.should.be.within(0, 10);
            res.body.food.foodRating.should.be.within(0, 10);

            done();
        });
  });

});
