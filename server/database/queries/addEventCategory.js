const connection = require('../config/connection');

const insertEventCategory = (category) => connection.query(`INSERT INTO event_category (category) values ($1) RETURNING *`, [category])

module.exports = insertEventCategory;
