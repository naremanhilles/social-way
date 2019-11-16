const connection = require('../config/connection');

module.exports = (userId, newImg) => connection.query('UPDATE "user" SET avatar = $1 WHERE id = $2', [newImg, userId]);
