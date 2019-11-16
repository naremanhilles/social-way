/* eslint-disable camelcase */
const { insertUser } = require('./../../../database/queries/insertUser');
const { getUserByEmail } = require('./../../../database/queries/getUser');
const { userPostSchema } = require('./../../utils/validationSchemes');
const { hashPassword } = require('./../../utils/helper');

exports.post = (req, res, next) => {
  const userInfo = { ...req.body };
  userPostSchema
    .validate(userInfo)
    .then((valid) => {
      if (!valid) {
        const validationErr = new Error('Please, Check the data you entered');
        validationErr.statusCode = 400;
        throw validationErr;
      }
      return getUserByEmail(userInfo.email);
    })
    .then((result) => {
      if (result) {
        const validationErr = new Error('Email already exists.');
        validationErr.statusCode = 400;
        throw validationErr;
      }
      return hashPassword(userInfo.password);
    })
    .then((hashedPass) => {
      userInfo.password = hashedPass;
      return insertUser(userInfo);
    })
    .then((result) => {
      const { password, ...userInfoResult } = result.rows[0];
      res.status(201).send({
        data: { ...userInfoResult },
        statusCode: 201,
      });
    })
    .catch((err) => {
      console.log(err)
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
