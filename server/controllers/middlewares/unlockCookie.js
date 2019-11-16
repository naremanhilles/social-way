const { verify } = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;
  if (jwt) {
    verify(jwt, process.env.SECRET, (error, unlockedCookie) => {
      if (error) {
        res.clearCookie('jwt');
        res.status(401).send({ error: 'unauthorized', statusCode: 401 });
      } else {
        req.user = unlockedCookie;
        next();
      }
    });
  } else {
    res.status(401).send({ error: 'unauthorized', statusCode: 401 });
  }
};
