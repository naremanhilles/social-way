const insertEventCategory = require('../../../database/queries/addEventCategory');

module.exports = async (req, res, next) => {
  const { tag } = req.body;
  try {
    const addedCategory = await insertEventCategory(tag);
    res.send({
      data: addedCategory.rows,
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
};
