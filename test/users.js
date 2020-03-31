// eslint-disable-next-line no-unused-vars
import should from 'should';
import request from 'supertest';
import mocha from 'mocha';

import app from '../server';
import User from '../models/user';

const { describe, it, before } = mocha;

describe('Users', () => {
  before((done) => {
    User.deleteMany({}, done);
  });
  describe('registration', () => {
    it('should register valid user', (done) => {
      request(app)
        .post('/users/register')
        .send({
          email: 'test@example.com',
          password: 'hello world',
        })
        .expect(302)
        .end((err, res) => {
          res.text.should.containEql('Redirecting to /');
          done(err);
        });
    });
  });
  describe('login', () => {
    it('should login with the registered user', (done) => {
      request(app)
        .post('/users/login')
        .send({
          email: 'test@example.com',
          password: 'hello world',
        })
        .expect(302)
        .end((err, res) => {
          res.text.should.containEql('Redirecting to /');
          done(err);
        });
    });
    it('should fail to login with bad user', (done) => {
      request(app)
        .post('/users/login')
        .send({
          email: 'test@example.com',
          password: 'hello_world',
        })
        .expect(302)
        .end((err, res) => {
          res.text.should.containEql(
            'Redirecting to /users/login',
          );
          done(err);
        });
    });
  });
});
