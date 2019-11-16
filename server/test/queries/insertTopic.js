const tape = require('tape');

const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build.js');
const { addTopic } = require('../../database/queries/postEvent');

tape('insert topic for post (Event) ', async (t) => {
  try {
    await buildDb();
    await buildStaticData();
    await buildFakeData();
    const eventId = 1;
    const topicId = 2;
    const res = await addTopic(eventId, topicId);
    if (res.rowCount === 1) {
      t.deepEqual(
        Object.keys(res.rows[0]),
        ['event_id', 'topic_id'],
        'New topic for (Event) added sucssfully',
      );
      t.equal(res.rows[0].event_id, 1, 'Same id for the event to add topic');
      t.end();
    } else {
      t.error();
    }
  } catch (err) {
    t.error(err);
  }
});

tape.onFinish(() => process.exit(0));
