const { compare } = require('bcryptjs');

const { hashPassword } = require('../../utils/helper');
const passwordSchema = require('./../../utils/passwordSchema');
const { updatePasswordQuery } = require('./../../../database/queries/updatePassword');
const { getPassword } = require('./../../../database/queries/getPassword');

exports.updatePassword = (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;
  getPassword(id)
    .then(dbRes => compare(oldPassword, dbRes.rows[0].password))
    .then((passMatch) => {
      if (passMatch) {
        return passwordSchema.isValid({
          password: newPassword,
        });
      }
      const objError = new Error('Password not match');
      objError.statusCode = 400;
      throw objError;
    })
    .then((valid) => {
      if (valid) return hashPassword(newPassword);
      const objError = new Error('Bad Request');
      objError.statusCode = 400;
      throw objError;
    })
    .then(newHashedPass => updatePasswordQuery(newHashedPass, id))
    .then(() => res.send({
      data: 'Updated Password Successfully',
      statusCode: 200,
    }))
    .catch((e) => {
      const { statusCode, message } = e;
      if (statusCode) {
        res.status(statusCode).send({
          statusCode, error: message,
        });
      } else {
        next(e);
      }
    });
};
