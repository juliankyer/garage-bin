process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();

const chaiHttp = require('chai-http');
const server = require('../server');

const configuration = require('../knexfile').test;
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Routes', () => {
  before((done) => {
  database.migrate.latest()
    .then(() => {
      return database.seed.run()
      .then(() => {
        done();
      });
    });
  });

  beforeEach((done) => {
    database.seed.run()
    .then(() => {
      done();
    });
  });
  
  it('should return all of the things in my garage', (done) => {
    chai.request(server)
      .get('/api/v1/items')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.a('object');
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('reason');
        response.body[0].should.have.property('cleanliness');
        done();
      });
  });
});