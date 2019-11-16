const test = require('tape');
const request = require('supertest');
const app = require('../../app');

const { buildDb, buildFakeData, buildStaticData } = require('../../database/config/build');

const cookieId3 = 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTYwODAwMjE2fQ.PeA2v-blt95xNFg0tFP_UZvayy7Re-dhxVgHjIaWTSU';
const invalidCookie = 'jwt=eyJhbGciJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTYwODAwMjE2fQ.XPTwlhVJw8L-NgqsOH5WlnpfWPJ3aNG7BtJfC3k8onM';

test('Testing /api/v1/post/live | GET | normal path', async (t) => {
  try {
    await buildDb();
    await buildStaticData();
    await buildFakeData();
    request(app)
      .get('/api/v1/post/live')
      .set('Cookie', [cookieId3])
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const resPosts = [
          {
            id: 1,
            tag: 'Petitions',
            title: 'News Title',
            type: 'public-service',
          },
        ];
        t.deepEqual(res.body.data, resPosts, 'should be equal');
        t.end();
      });
  } catch (err) {
    t.error(err);
  }
});

test('Testing /api/v1/post/live | GET | invalid cookie', async (t) => {
  try {
    await buildDb();
    await buildStaticData();
    await buildFakeData();
    request(app)
      .get('/api/v1/post/live')
      .set('Cookie', [invalidCookie])
      .expect(401)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        t.equal(res.body.error, 'unauthorized', 'unauthorized');
        t.end();
      });
  } catch (err) {
    t.error(err);
  }
});

test.onFinish(() => process.exit(0));
