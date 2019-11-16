const test = require('tape');
const supertest = require('supertest');

const app = require('../../app');
const { buildDb, buildFakeData, buildStaticData } = require('../../database/config/build');

test('Testing login route with valid username and password', async (t) => {
  await buildDb();
  await buildStaticData();
  await buildFakeData();

  supertest(app)
    .post('/api/v1/login')
    .send({ email: 'ahmedisam9922@gmail.com', password: '123' })
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      const resUser = JSON.parse(res.text).data;
      t.equal(resUser.first_name, 'Ahmed', 'First name must be Ahmed');
      t.equal(resUser.last_name, 'Abdellatif', 'Last name must be Abdellatif');
      t.equal(resUser.address, 'Omar Al-Mukhtar St.', 'Address must be Omar Al-Mukhtar St.');
      t.end();
    });
});

test('Testing login route with wrong password', (t) => {
  supertest(app)
    .post('/api/v1/login')
    .send({ email: 'ahmedisam9922@gmail.com', password: '124' })
    .expect(401)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      const parsedRes = JSON.parse(res.text);
      t.equal(parsedRes.error, 'Check your email or password', 'expect password to be wrong');
      t.equal(parsedRes.statusCode, 401, 'expect status code to be 401');
      t.end();
    });
});

test('Testing login route with wrong email', (t) => {
  supertest(app)
    .post('/api/v1/login')
    .send({ email: 'ahmed.isam@gmail.com', password: '123' })
    .expect(401)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end((err, res) => {
      if (err) t.error(err);
      const parsedRes = JSON.parse(res.text);
      t.equal(parsedRes.error, 'Check your email or password', 'expect email to be wrong');
      t.equal(parsedRes.statusCode, 401, 'expect status code to be 401');
      t.end();
    });
});
