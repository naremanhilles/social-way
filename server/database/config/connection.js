const { Pool } = require('pg');
const { parse } = require('url');
require('dotenv').config();

let DB_URL = '';

switch (process.env.NODE_ENV) {
  case 'testing':
    DB_URL = process.env.TESTING_DB;
    break;
  case 'production':
    DB_URL = process.env.DATABASE_PRODUCTION;
    break;
  case 'development':
    DB_URL = process.env.DATABASE_URL;
    break;
  default:
    throw new Error('not found the DB_URL');
}

const params = parse(DB_URL);
const [user, password] = params.auth.split(':');
const { path, hostname: host, port } = params;

const config = {
  user,
  password,
  database: path.split('/')[1],
  host,
  port,
  ssl: !(host === 'localhost'),
};

module.exports = new Pool(config);
