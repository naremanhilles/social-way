const deleteEventTopic = require('../../../database/queries/deleteEventTopic');

module.exports = async (req, res, next) => {
  try {
    const { tag } = req.body;
    const deletedTopic = await deleteEventTopic(tag);
    res.send({
      data: deletedTopic.rows,
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
};
