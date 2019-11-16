const connection = require('../config/connection');

module.exports = (type, postId) => (type === 'event'
  ? connection.query('SELECT publisher_id FROM event WHERE id = $1', [postId])
  : connection.query('SELECT publisher_id FROM public_service WHERE id = $1', [postId])
).then(res => res.rows[0].publisher_id);
