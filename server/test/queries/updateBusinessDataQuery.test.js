const tape = require('tape');

const { updateBusinessDataQuery } = require('../../database/queries/updateBusinessData');
const { buildDb, buildFakeData, buildStaticData } = require('../../database/config/build');


const expectedResult = {
  id: 1,
  first_name: 'Ahmed',
  last_name: 'Abdellatif',
  email: 'ahmedisam9922@gmail.com',
  password: '$2y$12$0tqIpfxzTSFIKFECzjS1XOKhhxAlPsexglTCOKhysSXVt.R4KTBAW',
  business_type: 'type TEST',
  website: 'www.website_TEST.com',
  organisation_name: 'name TEST',
  address: 'address TEST TEST',
  city: 'city TEST',
  country: 'country TEST',
  zip_code: 'WC2N 5DU',
  facebook: 'www.facebook_TEST.com',
  instagram: 'www.instagram_TEST.com',
  twitter: 'www.twitter_TEST.com',
  avatar: null,
};

tape('Query - Update Business Data || Valid User ID', (t) => {
  const name = 'name TEST';
  const type = 'type TEST';
  const website = 'www.website_TEST.com';
  const city = 'city TEST';
  const country = 'country TEST';
  const address = 'address TEST TEST';
  const zipCode = 'WC2N 5DU';
  const facebook = 'www.facebook_TEST.com';
  const twitter = 'www.twitter_TEST.com';
  const instagram = 'www.instagram_TEST.com';
  const userId = 1;
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      updateBusinessDataQuery(name, type, website, city, country, address, zipCode, facebook, twitter, instagram, userId)
        .then((result) => {
          t.deepEqual(result.rows[0], expectedResult, 'User with ID: 1 has updated his business data Successfully !!');
          t.end();
        });
    });
});

tape('Query - Update Business Data || Inexistent ID', (t) => {
  const name = 'name TEST';
  const type = 'type TEST';
  const website = 'www.website_TEST.com';
  const city = 'city TEST';
  const country = 'country TEST';
  const address = 'address TEST TEST';
  const zipCode = 'WC2N 5DU';
  const facebook = 'www.facebook_TEST.com';
  const twitter = 'www.twitter_TEST.com';
  const instagram = 'www.instagram_TEST.com';
  const userId = 46578;
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      updateBusinessDataQuery(name, type, website, city, country, address, zipCode, facebook, twitter, instagram, userId)
        .then((result) => {
          t.deepEqual(result.rowCount, 0, 'Can NOT update business Data for Inexistent ID');
          t.end();
        });
    });
});

tape.onFinish(() => process.exit(0));
