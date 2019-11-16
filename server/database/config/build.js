const { readFileSync } = require('fs');
const { join } = require('path');

const dbConnection = require('./connection');

const buildDb = () => {
  const buildSql = readFileSync(join(__dirname, 'build.sql')).toString();
  return dbConnection.query(buildSql);
};

const buildStaticData = () => {
  const staticSql = readFileSync(join(__dirname, 'staticData.sql')).toString();
  return dbConnection.query(staticSql);
};

const buildFakeData = () => {
  const fakeSql = readFileSync(join(__dirname, 'fakeData.test.sql')).toString();
  return dbConnection.query(fakeSql);
};

module.exports = { buildDb, buildFakeData, buildStaticData };
