const test = require('tape');
const request = require('supertest');
const app = require('../../../app');

const { buildDb, buildFakeData, buildStaticData } = require('../../../database/config/build');

test('Get all post from /api/v1/post/', async (t) => {
  try {
    await buildDb();
    await buildStaticData();
    await buildFakeData();
    request(app)
      .get('/api/v1/post/draft')
      .set('Cookie', [
        'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM',
      ])
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          t.error(err);
        } else if (res.body.data[0]) {
          t.equal(res.body.data[0].id, 2, 'Same id for the Post');
          t.end();
        } else {
          t.deepEqual(Object.keys(res.body.data), [], 'Get all posts sucssfully');
          t.equal(res.body.data.length, 0, 'No posts in the database');
          t.end();
        }
      });
  } catch (err) {
    t.error(err);
  }
});

test.onFinish(() => process.exit(0));
