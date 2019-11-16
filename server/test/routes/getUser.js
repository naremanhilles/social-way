const request = require('supertest');
const test = require('tape');

const app = require('../../app');
const { buildDb, buildStaticData, buildFakeData } = require('../../database/config/build');

const user = {
  id: 1,
  first_name: 'Ahmed',
  last_name: 'Abdellatif',
  email: 'ahmedisam9922@gmail.com',
  business_type: 'Charity',
  website: 'https://www.google.com',
  organisation_name: 'Ahmed Co.',
  address: 'Omar Al-Mukhtar St.',
  city: 'Gaza',
  country: 'Palestine',
  zip_code: '79702',
  facebook: 'https://www.facebook.com',
  instagram: 'https://www.instagram.com',
  twitter: 'https://www.twitter.com',
  avatar: null,
};

test('testing /user | GET route', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      request(app)
        .get('/api/v1/user')
        .set('Cookie', [
          'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM',
        ])
        .expect(200)
        .end((error, response) => {
          const resUser = response.body.data;
          t.deepEqual(resUser, user, 'should be true');
          t.end();
        });
    })
    .catch(t.error);
});

test('testing /user | GET route | wrong path', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      request(app)
        .get('/api/v1/user')
        .set('Cookie', [
          'jwt=eyJhbGciOiJIUzI1NiIs5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM',
        ])
        .expect(401)
        .end((error, response) => {
          t.equal(response.body.error, 'unauthorized', 'should be unauthorized');
          t.end();
        });
    })
    .catch(t.error);
});

const cookie = 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTYwNzc3MzE0fQ.9HU7nVgfgRsB0FXuXRaWiG6sBEEQutkQEe-uQc9DTE8';

test('testing /user | GET route | user does not exist', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      request(app)
        .get('/api/v1/user')
        .set('Cookie', [cookie])
        .expect(400)
        .end((error, response) => {
          t.equal(response.body.error, 'Bad Request', 'should be unauthorized');
          t.end();
        });
    })
    .catch(t.error);
});
