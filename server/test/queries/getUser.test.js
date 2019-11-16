const test = require('tape');

const { buildDb, buildStaticData, buildFakeData } = require('../../database/config/build');
const { getUserByEmail, getUserById } = require('../../database/queries/getUser');

const user = {
  id: 2,
  first_name: 'Amin',
  last_name: 'Al-Akhsam',
  email: 'aminking@gmail.com',
  password:
    '$2y$12$0tqIpfxzTSFIKFECzjS1XOKhhxAlPsexglTCOKhysSXVt.R4KTBAW',
  business_type: 'Community organisation',
  website: 'https://www.google.com',
  organisation_name: 'Amin Co.',
  address: 'Omar Al-Mukhtar St.',
  city: 'Gaza',
  country: 'Palestine',
  zip_code: '79702',
  facebook: 'https://www.facebook.com',
  instagram: 'https://www.instagram.com',
  twitter: 'https://www.twitter.com',
  avatar: null,
};

test('Testing getUser Query with existing user', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => getUserByEmail('ahmedisam9922@gmail.com'))
    .then((resUser) => {
      t.equal(resUser.first_name, 'Ahmed', 'First name must be Ahmed');
      t.equal(resUser.last_name, 'Abdellatif', 'Last name must be Abdellatif');
      t.equal(resUser.address, 'Omar Al-Mukhtar St.', 'Adress must be Omar Al-Mukhtar');
      t.end();
    });
});

test('testing selectUser Query', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => getUserById(2))
    .then((response) => {
      const resUser = response.rows[0];
      t.deepEqual(resUser, user, 'should be true');
      t.end();
    })
    .catch(t.error);
});
