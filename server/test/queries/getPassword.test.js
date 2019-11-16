const tape = require('tape');

const { getPassword } = require('./../../database/queries/getPassword');
const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build');

tape('Query - Get User Password', (e) => {
  const id = 1;
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      getPassword(id)
        .then((result) => {
          e.equal(result.rows[0].password, '$2y$12$0tqIpfxzTSFIKFECzjS1XOKhhxAlPsexglTCOKhysSXVt.R4KTBAW', 'Password Has Gotten');
          e.end();
        });
    });
});

tape('Query - Get User Password || No id', (e) => {
  const id = 50;
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      getPassword(id)
        .then((result) => {
          e.equal(result.rowCount, 0, 'No Password');
          e.end();
        });
    });
});

tape.onFinish(() => process.exit(0));
