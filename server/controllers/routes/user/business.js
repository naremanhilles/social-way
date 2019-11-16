const { compare } = require('bcryptjs');

const { getPassword } = require('./../../../database/queries/getPassword');
const { businessDataSchema } = require('../../utils/businessSchema');
const { updateBusinessDataQuery } = require('./../../../database/queries/updateBusinessData');

exports.updateBusiness = (req, res, next) => {
  const {
    oldPassword,
    organization,
    businessType,
    website,
    city,
    country,
    address,
    zipCode,
    facebook,
    twitter,
    instagram,
  } = req.body;
  const { id } = req.user;

  getPassword(id)
    .then(dbRes => compare(oldPassword, dbRes.rows[0].password))
    .then((passMatch) => {
      if (passMatch) {
        return businessDataSchema.isValid({
          organization,
          businessType,
          website,
          city,
          country,
          address,
          zipCode,
          facebook,
          twitter,
          instagram,
        });
      }
      const objError = new Error('Retry, password is wrong');
      objError.statusCode = 401;
      throw objError;
    })
    .then((valid) => {
      if (valid) {
        return updateBusinessDataQuery(
          organization,
          businessType,
          website,
          city,
          country,
          address,
          zipCode,
          facebook,
          twitter,
          instagram,
          id,
        );
      }
      const objError = new Error('Bad Request');
      objError.statusCode = 400;
      throw objError;
    })
    .then((dbToFront) => {
      const data = dbToFront.rows[0];
      delete data.password;

      res.send({
        data,
        statusCode: 200,
      });
    })
    .catch((e) => {
      const { statusCode, message } = e;
      if (statusCode) {
        res.status(statusCode).send({
          statusCode,
          error: message,
        });
      } else {
        next(e);
      }
    });
};
