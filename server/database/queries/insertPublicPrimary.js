const connection = require('../config/connection');

const insertPublicPrimary = (tag) => connection.query(`INSERT INTO primary_tag (tag) values ($1) RETURNING *`, [tag])

module.exports = insertPublicPrimary;
