const yup = require('yup');

module.exports = yup.object().shape({
  firstName: yup.string().min(3).required(),
  lastName: yup.string().min(3).required(),
  email: yup.string().email(),
});
