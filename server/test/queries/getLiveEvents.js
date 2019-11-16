const tape = require('tape');

const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build.js');
const { getEvents } = require('../../database/queries/getPosts');

tape('Get Live Events | Query | No posts available for this user', async (t) => {
  try {
    await buildDb();
    await buildStaticData();
    await buildFakeData();
    const publisherId = 3;
    const res = await getEvents('false', publisherId);
    t.equal(res.rowCount, 0, 'No posts');
    t.end();
  } catch (err) {
    t.error(err);
  }
});

tape('Get Live Events | Query', async (t) => {
  try {
    await buildDb();
    await buildStaticData();
    await buildFakeData();
    const publisherId = 2;
    const res = await getEvents('false', publisherId);
    const resPosts = [
      {
        id: 1,
        category: 'Events and Festivals',
        title: 'The main Event',
      },
      {
        id: 2,
        category: 'Events and Festivals',
        title: 'The main Event',
      },
    ];
    t.deepEqual(res.rows, resPosts, 'should be equal');
    t.end();
  } catch (err) {
    t.error(err);
  }
});

tape.onFinish(() => process.exit(0));
