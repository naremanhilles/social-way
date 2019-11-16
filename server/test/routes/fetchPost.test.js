const test = require('tape');
const request = require('supertest');

const app = require('../../../server/app');
const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build.js');

test('get event post', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      request(app)
        .get('/api/v1/post/1')
        .set('Cookie', [
          'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTYwNjQ3ODAxfQ._8HuPnW0ToN5B1aH-ubzGRHoSoJlEywVCmggd3aoiOU',
        ])
        .query({ postType: 'event' })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          } else if (res.body.error) {
            t.error(res.body.error);
          } else {
            const eventInfo = res.body.data;
            t.equal(Object.keys(eventInfo).length, 4, 'get sucssfully');
            t.equal(res.body.data['0'].id, 1, 'id is 2');
            t.end();
          }
        });
    })
    .catch(err => console.log(err));
});

test('get public_service post', (t) => {
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => {
      request(app)
        .get('/api/v1/post/1')
        .set('Cookie', [
          'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTYwNjQ4NzgzfQ.PD8QTSkYcWVUMZ_o7mhKgt1J0MWrAoArQqtv2dlTT28',
        ])
        .query({ postType: 'public_service' })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          } else if (res.body.error) {
            t.error(res.body.error);
          } else {
            const publicServiceInfo = res.body.data;
            t.equal(Object.keys(publicServiceInfo).length, 3, 'get sucssfully');
            t.equal(res.body.data['0'].id, 1, 'id is 1');
            t.end();
          }
        });
    })
    .catch(err => console.log(err));
});

test.onFinish(() => process.exit(0));
