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
            res.body.should.have.property('city').that.is.an('string');
            res.body.should.have.deep.property('wages.averageWage').that.is.an('number');
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
              element.should.have.property('city').that.is.an('string');
              element.should.have.deep.property('wages.averageWage').that.is.an('number');
              element.wages.rating.should.be.within(0, 10);
            }
            done();
        });
  });

});
