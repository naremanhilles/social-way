const connection = require('../config/connection');

const deleteEventCategory = (category) => connection.query(`DELETE FROM event_category WHERE event_category.category = $1 RETURNING *`, [category])

module.exports = deleteEventCategory;
