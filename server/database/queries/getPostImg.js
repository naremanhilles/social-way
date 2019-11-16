const connection = require('../config/connection');

module.exports = (postType, postId) => (postType === 'event'
  ? connection
    .query('SELECT image FROM event WHERE id = $1', [postId])
    .then(res => res.rows[0].image)
  : connection
    .query('SELECT image FROM public_service WHERE id = $1', [postId])
    .then(res => res.rows[0].image));
