const { getEventCategory } = require('../../../database/queries/getEventCategories');
const { getEventTopics } = require('../../../database/queries/getEventTopics');

module.exports = async (req, res, next) => {
  try {
    const categories = await getEventCategory();
    const topics = await getEventTopics();
    res.send({
      data: {
        categories: categories.rows,
        topics: topics.rows,
      },
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
};
