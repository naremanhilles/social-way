const tape = require('tape');

const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build.js');
const { addPublicServices } = require('../../database/queries/postEvent');

tape('insert new post (Public Services) ', async (t) => {
  const publicServicesData = {
    title: 'the main Public Services',
    description: 'any desc',
    primaryTag: 1,
    image: 'images.pexels.com/photos/617278/pexels-photo',
    focusKey: 'any key',
    meta: 'this is meta',
    altText: 'alt for the image',
    isDraft: false,
    publisherId: 1,
    publishDatetime: '11/6/ 2019 - 04.30 p.m',
  };

  try {
    await buildDb();
    await buildStaticData();
    await buildFakeData();
    const res = await addPublicServices(publicServicesData);
    if (res.rowCount === 1) {
      t.deepEqual(
        Object.keys(res.rows[0]),
        [
          'id',
          'primary_tag',
          'description',
          'image',
          'focus_key',
          'alt_text',
          'meta',
          'publisher_id',
          'publish_datetime',
          'title',
          'is_draft',
        ],
        'New Post (Event) added sucssfully',
      );
      t.equal(res.rows[0].id, 2, 'Same id for the new event');
      t.end();
    } else {
      t.error();
    }
  } catch (err) {
    t.error(err);
  }
});

tape.onFinish(() => process.exit(0));
