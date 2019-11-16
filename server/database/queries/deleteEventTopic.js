const connection = require('../config/connection');

const deleteEventTopic = (topic) => connection.query(`DELETE FROM topic WHERE topic.topic = $1 RETURNING *`, [topic])

module.exports = deleteEventTopic;
