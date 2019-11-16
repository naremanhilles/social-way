const connection = require('./../config/connection');

exports.updatePersonalDataQuery = (firstName, lastName, email, userId) => connection.query('UPDATE "user" SET first_name=$1, last_name=$2, email=$3 WHERE id=$4 RETURNING *', [firstName, lastName, email, userId]);
