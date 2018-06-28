const { ObjectID } = require('mongodb');
const request = require('supertest');
const express = require('express');
const chai = require('chai');
const expect = chai.expect;

const { User } = require('./../models/user');
const app = require('./../app');

const { dummyUser } = require('./seed');

const populateUser = (done) => {
  User.remove({}).then(() => {
    let userOne = new User(dummyUser[0]).save();
    let userTwo = new User(dummyUser[1]).save();
    return Promise.all([userOne, userTwo]);
  }).then(() => done());
}

/** seed db for testing */
beforeEach(populateUser);

describe('POST /api/register', () => {

  it('Create a New User', (done) => {
    expect(true).equal(true);
    const firstName = 'Iswanul';
    const lastName = 'Umam';
    const email = 'user126@gmail.com';
    const password = 'user126';
    request(app)
      .post('/api/register')
      .send({ firstName, lastName, email, password })
      .expect(201)
      .expect((result) => {
        expect(result.headers['x-auth']).to.exist;
        expect(result.body.message).equal('register success');
      })
      .end(done);
  });

  it('Create user with invalid input', (done) => {
    request(app)
      .post('/api/register')
      .send({})
      .expect(400)
      .end(done);
  });

  it('Validation error email in use', (done) => {
    const firstName = 'user127';
    const lastName = 'user127';
    const email = dummyUser[0].email;
    const password = 'user127';
    request(app)
      .post('/api/register')
      .send({ firstName, lastName, email, password })
      .expect(400)
      .end(done);
  });

  it('Validation error email invalid format', (done) => {
    const firstName = 'user127';
    const lastName = 'user127';
    const email = 'user127gmail.com';
    const password = 'user127';
    request(app)
      .post('/api/register')
      .send({ firstName, lastName, email, password })
      .expect(400)
      .end(done);
  });

  it('Validation error password invalid', (done) => {
    const firstName = 'user12';
    const lastName = 'user12';
    const email = 'user128gmail.com';
    const password = 'without_number';
    request(app)
      .post('/api/register')
      .send({ firstName, lastName, email, password })
      .expect(400)
      .end(done);
  });

  it('User 401 not authenticated', (done) => {
    request(app)
      .get('/api/me')
      .expect(401)
      .expect((result) => {
        expect(result.body).to.deep.equal({
            status: 'unauthorized',
            message: 'permission denied',
          });
      })
      .end(done);
  })

  it('User authenticated', (done) => {
    request(app)
      .get('/api/me')
      .set('x-auth', dummyUser[0].tokens[0].token)
      .expect((result) => {
        expect(result.body.user._id).to.equal(dummyUser[0]._id.toHexString());
        expect(result.body.user.email).to.equal(dummyUser[0].email);
      })
      .end(done);
  })
});

describe('POST /api/login', () => {
  it('Login user return auth token', (done) => {
    request(app)
      .post('/api/login')
      .send({
        email: dummyUser[1].email,
        password: dummyUser[1].password,
      })
      .expect(200)
      .expect((result) => {
        expect(result.headers['x-auth']).to.exist;
      })
      .end((err, result) => {
        if (err) return done(err);
        User.findById(dummyUser[1]._id).then((user) => {
          expect(user.tokens[1].token).to.equal(result.headers['x-auth']);
          done();
        }).catch((e) => done(e));
      });
  });

  
});