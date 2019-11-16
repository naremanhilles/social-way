const insertPublicPrimary = require('../../../database/queries/insertPublicPrimary');

module.exports = async (req, res, next) => {
  const { tag } = req.body;
  try {
    const addedTag = await insertPublicPrimary(tag);
    res.send({
      data: addedTag.rows,
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
};
