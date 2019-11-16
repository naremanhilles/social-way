const { compare } = require("bcryptjs");
const { genCookie } = require("../../utils/helper");
const personalSchema = require("../../utils/personalSchema");
const { getPassword } = require("./../../../database/queries/getPassword");
const {
  updatePersonalDataQuery
} = require("./../../../database/queries/updatePersonalData");

exports.updatePersonal = (req, res, next) => {
  const { oldPassword, firstName, lastName, email } = req.body;
  const { id } = req.user;

  personalSchema
    .isValid({
      firstName,
      lastName,
      email
    })
    .then(valid => {
      if (!valid) {
        const objError = new Error("Bad Request");
        objError.statusCode = 400;
        throw objError;
      }
      return getPassword(id);
    })
    .then(dbRes => compare(oldPassword, dbRes.rows[0].password))
    .then(passMatch => {
      if (passMatch)
        return updatePersonalDataQuery(firstName, lastName, email, id);
      const objError = new Error("Retry, password is wrong");
      objError.statusCode = 400;
      throw objError;
    })
    .then(({ rows }) => {
      const user = rows[0];
      const { password: pass, ...userResult } = user;
      const cookieOptions = {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
      };
      res.cookie(
        "jwt",
        genCookie({
          ...userResult,
          role: user.id === 1 ? "admin" : "member"
        }),
        cookieOptions
      );
      res.send({
        data: "Personal Data Updated Successfully",
        statusCode: 200
      });
    })
    .catch(e => {
      const { statusCode, message } = e;
      if (statusCode) {
        res.status(statusCode).send({
          statusCode,
          error: message
        });
      } else {
        next(e);
      }
    });
};
