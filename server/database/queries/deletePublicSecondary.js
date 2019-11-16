const connection = require('../config/connection');

const deletePublicSecondary = (tag) => connection.query(`DELETE FROM secondary_tag WHERE secondary_tag.tag = $1 RETURNING *`, [tag])

module.exports = deletePublicSecondary;
