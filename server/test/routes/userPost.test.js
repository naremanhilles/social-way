const test = require('tape');
const request = require('supertest');

const app = require('../../../server/app');
const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build.js');

test('post in /api/v1/user (with valid data)', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      request(app)
        .post('/api/v1/user')
        .send({
          firstName: 'amin',
          lastName: 'alakhsham',
          email: 'amin@gmail.com',
          password: 'aminamin',
          businessType: 'Business',
          website: 'https://www.socialstreets.com',
          organization: 'social-street',
          address: 'gaza strip',
          city: 'gaza',
          country: 'palestine',
          zipCode: 'WC2N 5DU',
          facebook: 'https://fb.com/aminalakhsham',
          twitter: 'https://twitter.com/aminalakhsham',
          instagram: 'https://www.instagram.com/aminalakhsham',
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          } else if (res.body.error) {
            t.error(res.body.error);
          } else {
            t.equal(res.body.data.id, 4, 'id is four');
            t.end();
          }
        });
    })
    .catch(err => console.log(err));
});

test('post in /api/v1/user (Email exists)', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      request(app)
        .post('/api/v1/user')
        .send({
          firstName: 'amin',
          lastName: 'alakhsham',
          email: 'aminking@gmail.com',
          password: 'aminamin',
          businessType: 'Business',
          website: 'https://www.socialstreets.com',
          organization: 'social-street',
          address: 'gaza strip',
          city: 'gaza',
          country: 'palestine',
          zipCode: 'WC2N 5DU',
          facebook: 'https://fb.com/aminalakhsham',
          twitter: 'https://twitter.com/aminalakhsham',
          instagram: 'https://www.instagram.com/aminalakhsham',
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          } else {
            t.equal(res.body.error, 'Email already exists.', 'fail insert user');
            t.end();
          }
        });
    })
    .catch(err => console.log(err));
});

test('post in /api/v1/user (with not valid data)', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      request(app)
        .post('/api/v1/user')
        .send({
          firstName: 'amin',
          lastName: 'alakhsham',
          email: 'aminking',
          password: 'aminamin',
          businessType: 'Business',
          website: 'socialstreets',
          organization: 'social-street',
          address: 'gaza strip',
          city: 'gaza',
          country: 'palestine',
          zipCode: 'WC2N 5DU',
          facebook: 'https://fb.com/aminalakhsham',
          twitter: 'https://twitter.com/aminalakhsham',
          instagram: 'https://www.instagram.com/aminalakhsham',
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          } else {
            t.equal(res.body.error, 'Please, Check the data you entered', 'fail insert user');
            t.end();
          }
        });
    })
    .catch(err => console.log(err));
});

test.onFinish(() => process.exit(0));
