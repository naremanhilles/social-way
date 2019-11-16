const test = require('tape');

const { deleteEvent, deletePublicService } = require('./../../database/queries/deletePost');
const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build.js');

test('testing delete Event Query', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => deleteEvent(1, 2))
    .then((response) => {
      t.equal(response.rows[0].id, 1, 'id should be 1');
      t.end();
    })
    .catch(t.error);
});

test('testing delete public service Query', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => deletePublicService(1, 3))
    .then((response) => {
      t.equal(response.rows[0].id, 1, 'post id should be 1');
      t.end();
    })
    .catch(t.error);
});

test('testing delete public service Query | no posts for this user', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => deletePublicService(1, 2))
    .then((response) => {
      t.equal(response.rowCount, 0, 'no posts');
      t.end();
    })
    .catch(t.error);
});
