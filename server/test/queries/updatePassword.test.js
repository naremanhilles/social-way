const tape = require('tape');

const { updatePasswordQuery } = require('./../../database/queries/updatePassword');
const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build');

tape('Query - Update User Password', (e) => {
  const password = '123456789';
  const id = 1;
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => {
      updatePasswordQuery(password, id)
        .then((result) => {
          e.equal(result.rows[0].password, '123456789', 'Password Has Changed !!');
          e.end();
        });
    });
});

tape('Query - Update User Password', (e) => {
  const password = '123456789';
  const id = 50;
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => {
      updatePasswordQuery(password, id)
        .then((result) => {
          e.equal(result.rowCount, 0, 'No id to update his password');
          e.end();
        });
    });
});

tape.onFinish(() => process.exit(0));
