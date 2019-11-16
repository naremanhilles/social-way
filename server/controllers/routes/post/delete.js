const { deleteEvent, deletePublicService } = require('../../../database/queries/deletePost');
const getPostPublisher = require('../../../database/queries/getPostPublisher');

module.exports = (req, res, next) => {
  const { postId } = req.params;
  const userId = req.user.id;
  const { type } = req.body;

  getPostPublisher(type, postId)
    .then((publisherId) => {
      if (userId !== publisherId) throw Error('unauthorized');
    })
    .then(() => {
      if (type === 'event') {
        return deleteEvent(postId, userId);
      }
      if (type === 'public-service') {
        return deletePublicService(postId, userId);
      }
      throw Error('Bad Request');
    })
    .then((response) => {
      if (!response.rowCount) {
        throw Error('Bad Request');
      } else {
        res.send({ statusCode: 200, data: response.rows[0] });
      }
    })
    .catch((err) => {
      const { message } = err;
      switch (message) {
        case 'Bad Request':
          res.status(400).send({ statusCode: 400, error: message });
          break;
        case 'unauthorized':
          res.status(401).send({ statusCode: 401, error: message });
          break;
        case 'Cannot read property \'publisher_id\' of undefined':
          res.status(400).send({ statusCode: 400, error: 'Bad Request' });
          break;
        default:
          next(err);
      }
    });
};
