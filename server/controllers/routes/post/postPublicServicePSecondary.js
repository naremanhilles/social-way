const insertPublicSecondary = require('../../../database/queries/insertPublicSecondary');

module.exports = async (req, res, next) => {
  const { tag } = req.body;
  try {
    const addedTag = await insertPublicSecondary(tag);
    res.send({
      data: addedTag.rows,
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
};
