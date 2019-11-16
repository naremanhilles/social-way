const tape = require('tape');

const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build.js');
const { getPublicServices } = require('../../database/queries/getPosts');

tape('Get Live Public Services | Query', async (t) => {
  try {
    await buildDb();
    await buildStaticData();
    await buildFakeData();
    const publisherId = 3;
    const res = await getPublicServices('false', publisherId);
    const resPublicService = [{ id: 1, tag: 'Petitions', title: 'News Title' }];
    t.deepEqual(res.rows, resPublicService, 'should be equal');
    t.end();
  } catch (err) {
    t.error(err);
  }
});

tape('Get Live Public Services | Query, user has no live posts', async (t) => {
  try {
    await buildDb();
    await buildStaticData();
    await buildFakeData();
    const publisherId = 2;
    const res = await getPublicServices('false', publisherId);
    t.equal(res.rowCount, 0, 'No posts');
    t.end();
  } catch (err) {
    t.error(err);
  }
});

tape.onFinish(() => process.exit(0));
