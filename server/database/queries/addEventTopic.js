const connection = require('../config/connection');

const insertEventTopic = (topic) => connection.query(`INSERT INTO topic (topic) values ($1) RETURNING *`, [topic])

module.exports = insertEventTopic;
