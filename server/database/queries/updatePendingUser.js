const connection = require('../config/connection');

exports.acceptUser = userId => connection.query('UPDATE "user" SET pending = \'false\' WHERE id = $1 RETURNING *', [userId]);

exports.rejectUser = userId => connection.query('DELETE FROM "user" WHERE id = $1 AND pending = \'true\' RETURNING *', [
  userId,
]);
