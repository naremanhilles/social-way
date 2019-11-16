const { getUserById } = require('./../../../database/queries/getUser');

exports.get = (req, res, next) => {
  getUserById(req.user.id)
    .then((response) => {
      if (!response.rowCount) { return res.status(400).send({ error: 'Bad Request', statusCode: 400 }); }
      delete response.rows[0].password;
      return res.send({ data: response.rows[0], statusCode: 200 });
    })
    .catch(next);
};
