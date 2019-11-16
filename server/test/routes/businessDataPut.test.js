const tape = require('tape');
const request = require('supertest');

const app = require('../../../server/app');
const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build');

tape('PUT in /api/v1/user/business || Valid', (t) => {

  const expectedValues = [1, 'Ahmed', 'Abdellatif', 'ahmedisam9922@gmail.com', 'Charity', 'https://www.website.com', 'nameNAME TEST', 'addressADDRESS TEST TEST', 'cityCITY TEST', 'countryCOUNTRY TEST', 'WC2N 5DU', 'https://www.facebook_TEST.com', 'https://www.instagram.com/israasuliman/', 'https://www.twitter_TEST.com', null];

  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      request(app)
        .put('/api/v1/user/business')
        .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM'])
        .send({
          oldPassword: '123',
          organization: 'nameNAME TEST',
          businessType: 'Charity',
          website: 'https://www.website.com',
          city: 'cityCITY TEST',
          country: 'countryCOUNTRY TEST',
          address: 'addressADDRESS TEST TEST',
          zipCode: 'WC2N 5DU',
          facebook: 'https://www.facebook_TEST.com',
          twitter: 'https://www.twitter_TEST.com',
          instagram: 'https://www.instagram.com/israasuliman/',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          }
          t.deepEqual(Object.values(res.body.data), expectedValues, 'PUT method on /business Work Successfully');
          t.end();
        });
    });
});

tape('PUT in /api/v1/user/business || Invalid Business Data', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      request(app)
        .put('/api/v1/user/business')
        .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM'])
        .send({
          oldPassword: '123',
          organization: 'nameT',
          businessType: 'invalid',
          website: 'www.website_TEST.com',
          city: 'cityT',
          country: 'countryT',
          address: 'addressT',
          zipCode: 'WC2N 5DU',
          facebook: 'www.facebook_TEST.com',
          twitter: 'www.twitter_TEST.com',
          instagram: 'www.instagram.com/israa.sulaiman/',
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          }
          t.equal(res.body.error, 'Bad Request', 'Not updating Business with invalid DATA /business');
          t.end();
        });
    });
});

tape('PUT in /api/v1/user/business || Invalid Password', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      request(app)
        .put('/api/v1/user/business')
        .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM'])
        .send({
          oldPassword: '************',
          organization: 'nameT',
          businessType: 'typeT',
          website: 'www.website_TEST.com',
          city: 'cityT',
          country: 'countryT',
          address: 'addressT',
          zipCode: 'WC2N 5DU',
          facebook: 'www.facebook_TEST.com',
          twitter: 'www.twitter_TEST.com',
          instagram: 'www.instagram.com/israa.sulaiman/',
        })
        .expect(401)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          }
          t.equal(res.body.error, 'Retry, password is wrong', 'Not updating Business Data on /business with a WRONG PASSWORD');
          t.end();
        });
    });
});

tape.onFinish(() => process.exit(0));
