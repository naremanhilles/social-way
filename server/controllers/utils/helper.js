const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');

exports.hashPassword = password => bcrypt.hash(password, 10);

exports.genCookie = ({
  id, email, role, first_name: fName, last_name: lName,
}) => sign({
  id, email, role, name: `${fName} ${lName}`,
}, process.env.SECRET);
