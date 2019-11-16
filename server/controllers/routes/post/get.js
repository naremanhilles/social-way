const { getEvent, getPublicService } = require('./../../../database/queries/getPost');
const { fetchPostSchema } = require('./../../utils/validationSchemes');

exports.get = (req, res, next) => {
  const { id: idUser } = req.user;
  const { postId } = req.params;
  const { postType } = req.query;

  fetchPostSchema
    .isValid({ postId, postType, idUser })
    .then((validation) => {
      if (validation) {
        return postType === 'event' ? getEvent(postId, idUser) : getPublicService(postId, idUser);
      }
      const validationErr = new Error('Email already exists.');
      validationErr.statusCode = 400;
      throw validationErr;
    })
    .then(result => res.send({ data: result.rows, statusCode: 200 }))
    .catch((err) => {
      const { statusCode } = err;
      switch (statusCode) {
        case 400:
          res.status(400).send({ error: err.message, statusCode: 400 });
          break;
        default:
          next(err);
      }
    });
};
