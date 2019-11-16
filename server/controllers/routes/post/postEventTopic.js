const insertEventTopic = require('../../../database/queries/addEventTopic');

module.exports = async (req, res, next) => {
  const { tag } = req.body;
  try {
    const addedTopic = await insertEventTopic(tag);
    res.send({
      data: addedTopic.rows,
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
};
