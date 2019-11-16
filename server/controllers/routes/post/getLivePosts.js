const { getEvents, getPublicServices } = require('../../../database/queries/getPosts');

module.exports = async (req, res, next) => {
  try {
    const { id: publisherId } = req.user;
    const resEvent = await getEvents('false', publisherId);
    const resPublic = await getPublicServices('false', publisherId);
    resEvent.rows.forEach(event => (event.type = 'event'));
    resPublic.rows.forEach(publicPost => (publicPost.type = 'public-service'));
    res.send({
      data: [...resEvent.rows, ...resPublic.rows],
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
};
