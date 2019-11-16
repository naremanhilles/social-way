const connection = require('../config/connection');

const deletePublicPrimary = (tag) => connection.query(`DELETE FROM primary_tag WHERE primary_tag.tag = $1 RETURNING *`, [tag])

module.exports = deletePublicPrimary;
