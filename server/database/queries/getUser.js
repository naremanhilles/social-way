const dbConnection = require('../config/connection');

exports.getUserByEmail = email => dbConnection
  .query('SELECT * FROM "user" WHERE email = $1', [email])
  .then(res => res.rows.length && res.rows[0]);

const connection = require('../config/connection');

exports.getUserById = id => connection.query('SELECT * FROM "user" WHERE id = $1', [id]);

exports.getAllUsers = () => connection.query('SELECT * FROM "user" WHERE id != 1 AND pending = \'false\'');

exports.getAllPendingUsers = () => connection.query('SELECT * FROM "user" WHERE id != 1 AND pending = \'true\'');
