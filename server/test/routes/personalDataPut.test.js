const tape = require('tape');
const requset = require('supertest');

const app = require('../../../server/app');
const {
  buildDb,
  buildFakeData,
  buildStaticData,
} = require('./../../database/config/build');

tape('PUT in /api/v1/user/personal || Valid', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      requset(app)
        .put('/api/v1/user/personal')
        .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM'])
        .send({
          oldPassword: '123',
          firstName: 'Khader',
          lastName: 'Murtaja',
          email: 'kaka@kaka.com',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          }
          t.equal(JSON.parse(res.text).data, 'Personal Data Updated Successfully', 'Personal Data Have Updated Successfully');
          t.end();
        });
    })
    .catch(err => console.log(err));
});

tape('PUT in /api/v1/user/personal || Invalid Password', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      requset(app)
        .put('/api/v1/user/personal')
        .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM'])
        .send({
          oldPassword: '********',
          firstName: 'Khader',
          lastName: 'Murtaja',
          email: 'kaka@kaka.com',
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          }
          t.equal(res.body.error, 'Retry, password is wrong', 'Can not update data with wrong password');
          t.end();
        });
    })
    .catch(err => console.log(err));
});

tape('PUT in /api/v1/user/personal || Invalid Data', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      requset(app)
        .put('/api/v1/user/personal')
        .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM'])
        .send({
          oldPassword: '123',
          firstName: 'K',
          lastName: 'M',
          email: 'com',
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          }
          t.equal(res.body.error, 'Bad Request', 'Can not update data with invalid password');
          t.end();
        });
    })
    .catch(err => console.log(err));
});

tape.onFinish(() => process.exit(0));
