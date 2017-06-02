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
  
  it('should allow you to put an item in the garage', (done) => {
    chai.request(server)
      .post('/api/v1/items')
      .send({
        name: 'Skis',
        reason: 'Funsies',
        cleanliness: 'sparkling'
      })
      .end((error, response) => {
        response.should.have.status(201);
        chai.request(server)
          .get('/api/v1/items')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.length.should.equal(3);
            res.body[2].name.should.equal('Skis');
            res.body[2].reason.should.equal('Funsies');
            res.body[2].cleanliness.should.equal('sparkling');
            done();
          });
      });
  });
  
  it('should not allow you to post an item to the db with incomplete data', (done) => {
    chai.request(server)
      .post('/api/v1/items')
      .send({
        name: 'Poles',
        reason: 'Skis get lonely'
      })
      .end((error, response) => {
        response.should.have.status(400);
        response.body.error.should.equal('Make sure all data fields are present.');
        done();
      });
  });
});