const bcrypt = require("bcryptjs");

const { genCookie } = require("../utils/helper.js");
const { getUserByEmail } = require("../../database/queries/getUser");
const { loginSchema } = require("../utils/validationSchemes");

module.exports = (req, res, next) => {
  const { email, password, rememberMe } = req.body;
  loginSchema
    .isValid({ email, password })
    .then(valid => {
      if (!valid) {
        const validationErr = new Error("Bad Request");
        validationErr.statusCode = 400;
        throw validationErr;
      }
      return getUserByEmail(email);
    })
    .then(user => {
      if (!user) {
        const authErr = new Error("Please Enter a valid email and/or password");
        authErr.statusCode = 401;
        throw authErr;
      } else {
        return bcrypt.compare(password, user.password).then(passIsValid => {
          if (!passIsValid) {
            const authErr = new Error("Please Enter a valid email and/or password");
            authErr.statusCode = 401;
            throw authErr;
          } else {
            if(user.pending === true) {
              const error =  new Error('Your Account is under review');
              error.statusCode = 400;
              throw error;
            }
            const { password: pass, ...userResult } = user;
            const cookieOptions = rememberMe
              ? { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) }
              : { maxAge: 1000 * 60 * 60 };
            res.cookie(
              "jwt",
              genCookie({
                ...userResult,
                role: user.id === 1 ? "admin" : "member"
              }),
              cookieOptions
            );
            res.send({
              data: { ...userResult, role: user.id === 1 ? "admin" : "member" },
              statusCode: 200
            });
          }
        });
      }
    })
    .catch(e => {
      const { statusCode, message } = e;
      return statusCode
        ? res.status(statusCode).send({ error: message, statusCode })
        : next(e);
    });
};
