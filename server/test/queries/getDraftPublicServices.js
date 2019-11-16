const tape = require('tape');

const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build.js');
const { getPublicServices } = require('../../database/queries/getPosts');

tape('Get draft Events', async (t) => {
  try {
    await buildDb();
    await buildStaticData();
    await buildFakeData();
    const publisherId = 1;
    const res = await getPublicServices('true', publisherId);
    if (res.rowCount !== 0) {
      t.deepEqual(
        Object.keys(res.rows[0]),
        ['id', 'primary_tag', 'title'],
        'Get all draft public_services',
      );
      t.equal(res.rows[0].id, 2, 'Same id for the public_services');
      t.end();
    } else {
      t.equal(res.rowCount, 0, 'No draft public_services in the database');
      t.end();
    }
  } catch (err) {
    t.error(err);
  }
});

tape.onFinish(() => process.exit(0));
