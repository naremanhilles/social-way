const yup = require("yup");

const loginSchema = require("./loginSchema");

exports.loginSchema = loginSchema;

exports.userPostSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3)
    .required(),
  lastName: yup
    .string()
    .min(3)
    .required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(8)
    .required(),
  organization: yup
    .string()
    .min(5)
    .required(),
  businessType: yup.string().required(),
  website: yup
    .string()
    .matches(
      /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
    )
    .required(),
  address: yup
    .string()
    .min(5)
    .required(),
  country: yup
    .string()
    .min(3)
    .required(),
  city: yup
    .string()
    .min(3)
    .required(),
  zipCode: yup
    .string()
    .matches(/^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/)
    .required(),
  facebook: yup
    .string()
    .matches(
      /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
    ),
  twitter: yup
    .string()
    .matches(
      /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
    ),
  instagram: yup
    .string()
    .matches(
      /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
    )
});

exports.fetchPostSchema = yup.object().shape({
  postId: yup.number(),
  postType: yup.string().matches(/(\bevent\b)|(\bpublic_service\b)/)
});
