const { getEvents, getPublicServices } = require('../../../database/queries/getPosts');

const draftPosts = async (req, res, next) => {
  try {
    const { id: publisherId } = req.user;
    const resEvent = await getEvents('true', publisherId);
    const resPublic = await getPublicServices('true', publisherId);
    resEvent.rows.forEach(event => event.type = 'event');
    resPublic.rows.forEach(publicPost => publicPost.type = 'public-service');
    res.send({
      data: [...resEvent.rows, ...resPublic.rows],
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = draftPosts;
