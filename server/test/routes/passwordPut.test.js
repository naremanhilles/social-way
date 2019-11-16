const test = require('tape');
const request = require('supertest');

const app = require('../../../server/app');
const {
  buildDb,
  buildFakeData,
  buildStaticData,
} = require('./../../database/config/build.js');

test('PUT in /api/v1/user/password || With valid password', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      request(app)
        .put('/api/v1/user/password')
        .set('Cookie', [
          'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM',
        ])
        .send({
          oldPassword: '123',
          newPassword: '123456789',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          }
          t.equal(res.body.data, 'Updated Password Successfully', 'PUT method on /password Work Successfully');
          t.end();
        });
    })
    .catch(err => console.log(err));
});

test('PUT in /api/v1/user/password || With Wrong Password', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      request(app)
        .put('/api/v1/user/password')
        .set('Cookie', [
          'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM',
        ])
        .send({
          oldPassword: '********',
          newPassword: '123456789',
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          }
          t.equal(res.body.error, 'Password not match', 'Catch when password is wrong');
          t.end();
        });
    })
    .catch(err => console.log(err));
});

test.onFinish(() => process.exit(0));
