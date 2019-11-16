const connection = require('../config/connection');

const insertPublicSecondary = (tag) => connection.query(`INSERT INTO secondary_tag (tag) values ($1) RETURNING *`, [tag])

module.exports = insertPublicSecondary;
