const connection = require('../config/connection');

module.exports = userId => connection.query('DELETE FROM "user" WHERE id = $1 RETURNING *', [userId]);
