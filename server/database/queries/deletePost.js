const connection = require('../config/connection');

const deleteEvent = (postId, userId) => connection.query('DELETE FROM event WHERE event.id = $1 AND publisher_id = $2 RETURNING *', [postId, userId]);

const deletePublicService = (postId, userId) => connection.query('DELETE FROM public_service WHERE public_service.id = $1 AND publisher_id = $2 RETURNING *', [postId, userId]);

module.exports = {
  deleteEvent,
  deletePublicService,
};
