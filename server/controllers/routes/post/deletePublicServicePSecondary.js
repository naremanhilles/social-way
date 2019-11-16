const deletePublicSecondary = require('../../../database/queries/deletePublicSecondary');

module.exports = async (req, res, next) => {
  try {
    const { tag } = req.body;
    const deletedTopic = await deletePublicSecondary(tag);
    res.send({
      data: deletedTopic.rows,
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
};
