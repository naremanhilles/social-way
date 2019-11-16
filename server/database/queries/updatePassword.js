const connection = require('./../config/connection');

exports.updatePasswordQuery = (newPassword, userId) => connection.query('UPDATE "user" SET password = $1 WHERE id = $2 RETURNING *', [
  newPassword,
  userId,
]);
