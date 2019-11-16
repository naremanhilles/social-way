const tape = require('tape');

const { updatePersonalDataQuery } = require('./../../database/queries/updatePersonalData');
const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build');

tape('Query - Update User Personal Data || Valid', (e) => {
  const userId = 1;
  const firstName = 'Khader';
  const lastName = 'Murtaja';
  const email = 'aaa@bbb.com';
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => {
      updatePersonalDataQuery(firstName, lastName, email, userId)
        .then((result) => {
          e.equal(result.rows[0].first_name, 'Khader', 'Personal Data Have Updated in Database !!');
          e.end();
        });
    });
});

tape('Query - Update User Personal Data || Wrong id', (e) => {
  const userId = 48451;
  const firstName = 'Khader';
  const lastName = 'Murtaja';
  const email = 'aaa@bbb.com';
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      updatePersonalDataQuery(firstName, lastName, email, userId)
        .then((result) => {
          e.equal(result.rowCount, 0, 'Can not update data for inexistent id');
          e.end();
        });
    });
});

tape.onFinish(() => process.exit(0));
