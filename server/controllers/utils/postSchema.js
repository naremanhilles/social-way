const yup = require('yup');

const eventSchema = yup.object().shape({
  title: yup
    .string()
    .max(60)
    .required(),
  description: yup
    .string()
    .min(10)
    .required(),
  category: yup.number().required(),
  eventStartDatetime: yup.string().required(),
  eventEndDatetime: yup.string().required(),
  venue: yup.string().required(),
  altText: yup.string().required(),
  website: yup.string().required(),
  isDraft: yup.boolean().required(),
  focusKey: yup.string().required(),
  meta: yup
    .string()
    .min(5)
    .required(),
  publishDatetime: yup.string().required(),
  eventTopic: yup.array().required(),
});

const publicServiceSchema = yup.object().shape({
  primaryTag: yup.number().required(),
  description: yup
    .string()
    .min(10)
    .required(),
  focusKey: yup.string().required(),
  altText: yup.string().required(),
  meta: yup
    .string()
    .min(5)
    .required(),
  publishDatetime: yup.string().required(),
  title: yup
    .string()
    .max(60)
    .required(),
  isDraft: yup.boolean().required(),
  secondaryTag: yup.array().required(),
});

module.exports = {
  eventSchema,
  publicServiceSchema,
};
