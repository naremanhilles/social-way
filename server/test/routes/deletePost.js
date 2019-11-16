const test = require('tape');
const request = require('supertest');

const app = require('../../app');
const { buildDb, buildFakeData, buildStaticData } = require('../../database/config/build.js');
const { cookieId1, cookieId3, invalidCookie } = require('../utils/cookies');

test('test post route | DELETE | post for another user', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      request(app)
        .delete('/api/v1/post/1')
        .set('Cookie', [cookieId1])
        .send({ type: 'event' })
        .expect(401)
        .end((error, response) => {
          t.equal(response.body.error, 'unauthorized', 'bad request');
          t.end();
        });
    })
    .catch(t.error);
});

test('test post route | DELETE | normal path', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      request(app)
        .delete('/api/v1/post/1')
        .set('Cookie', [cookieId3])
        .send({ type: 'public-service' })
        .expect(200)
        .end((error, response) => {
          t.equal(response.body.data.id, 1, 'should be 1');
          t.end();
        });
    })
    .catch(t.error);
});

test('test post route | DELETE | post does not exist', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      request(app)
        .delete('/api/v1/post/2')
        .set('Cookie', [cookieId3])
        .send({ type: 'public-service' })
        .expect(400)
        .end((error, response) => {
          t.equal(response.body.error, 'Bad Request', 'bad request');
          t.end();
        });
    })
    .catch(t.error);
});

test('test post route | DELETE | cookie is invalid', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      request(app)
        .delete('/api/v1/post/2')
        .set('Cookie', [invalidCookie])
        .send({ type: 'public-service' })
        .expect(401)
        .end((error, response) => {
          t.equal(response.body.error, 'unauthorized', 'unauthorized');
          t.end();
        });
    })
    .catch(t.error);
});

test.onFinish(() => process.exit(0));
