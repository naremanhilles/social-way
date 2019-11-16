const { getAllUsers, getAllPendingUsers } = require('../../../database/queries/getUser');

exports.getAllUsers = (req, res, next) => getAllUsers()
  .then(dbRes => dbRes.rows.map((user) => {
    delete user.password;
    delete user.avatar;
    return user;
  }))
  .then(users => res.send({ data: users, statusCode: 200 }))
  .catch(next);

exports.getPendingUsers = (req, res, next) => getAllPendingUsers()
  .then(dbRes => dbRes.rows.map((user) => {
    delete user.password;
    delete user.avatar;
    return user;
  }))
  .then(users => res.send({ data: users, statusCode: 200 }))
  .catch(next);
