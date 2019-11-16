const tape = require('tape');

const { getPublicService } = require('./../../database/queries/getPost');
const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build.js');

tape('get Public Service post query test', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      getPublicService(1, 3)
        .then((res) => {
          if (res.rowCount === 3) {
            t.equal(res.rows[0].id, 1, 'id is one');
            t.end();
          } else {
            t.error();
          }
        })
        .catch((err) => {
          t.error(err);
        });
    })
    .catch(err => console.log(err));
});

tape.onFinish(() => process.exit(0));
