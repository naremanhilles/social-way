const deleteEventCategory = require('../../../database/queries/deleteEventCategory');

module.exports = async (req, res, next) => {
  try {
    const { tag } = req.body;
    const deletedCategory = await deleteEventCategory(tag);
    res.send({
      data: deletedCategory.rows,
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
};
