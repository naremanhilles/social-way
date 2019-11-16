const connection = require('./../config/connection');

exports.getPassword = userId => connection.query('SELECT password FROM "user" WHERE id = $1', [userId]);
