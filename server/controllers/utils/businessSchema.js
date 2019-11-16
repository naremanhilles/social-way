const yup = require('yup');

exports.businessDataSchema = yup.object().shape({
  organization: yup
    .string()
    .min(5)
    .required(),
  businessType: yup.string().required(),
  website: yup
    .string()
    .matches(
      /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    )
    .required(),
  city: yup
    .string()
    .min(3)
    .required(),
  country: yup
    .string()
    .min(3)
    .required(),
  address: yup
    .string()
    .min(5)
    .required(),
  zipCode: yup
    .string()
    .matches(/^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/)
    .required(),
  facebook: yup
    .string()
    .url()
    .nullable(true),
  twitter: yup
    .string()
    .url()
    .nullable(true),
  instagram: yup
    .string()
    .url()
    .nullable(true),
});
