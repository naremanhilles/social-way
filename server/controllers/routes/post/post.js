const { join } = require('path');

const {
  addEvent,
  addTopic,
  addPublicServices,
  addSecondaryTag,
} = require('../../../database/queries/postEvent');
const { eventSchema, publicServiceSchema } = require('../../utils/postSchema');

const post = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data)
    const { type, eventTopic, secondaryTag } = data;
    let image;
    req.files ? image = req.files.image : null
    const publisherId = Number(req.user.id);
    if (type === 'event') {
      if (!image || (image.size / 1024 / 1024) > 500) throw new Error();
      const valid = await eventSchema.isValid(data)
      if (valid) {
        const imageName = Date.now() + image.name;
        const addedEvent = await addEvent({
          ...data,
          publisherId,
          imageName,
        });
        await Promise.all(
          eventTopic.map(topicId => addTopic(addedEvent.rows[0].id, topicId)),
        );
        image.mv(
          join(__dirname, '..', '..', '..', 'uploads', imageName),
          (err) => {
            if (err) {
              next(err);
            } else {
              res.status(201).send({
                data: {
                  ...addedEvent.rows[0],
                },
                statusCode: 201,
              });
            }
          },
        );
      } else {
        const error = new Error('validation');
        error.statusCode = 400;
        throw error;
      }
    } else if (type === 'public_services') {
      const valid = await publicServiceSchema.validate(data);
      if (valid) {
        let imageName;
        image ? imageName = Date.now() + image.name : null;
        const addedPublicServices = await addPublicServices({
          ...data,
          publisherId,
          imageName,
        });
        await Promise.all(
          secondaryTag.map(secondaryTagId => addSecondaryTag(addedPublicServices.rows[0].id, secondaryTagId)),
        );
        if (image) {
          image.mv(join(__dirname, '..', '..', '..', 'uploads', imageName), (err) => {
            if (err) {
              next(err);
            } else {
              res.status(201).send({
                data: {
                  ...addedPublicServices.rows[0],
                },
                statusCode: 201,

              });
            }
          });
        } else {
          res.status(201).send({
            data: {
              ...addedPublicServices.rows[0],
            },
            statusCode: 201,

          });
        }
      } else {
        const error = new Error('Unsupported post type');
        error.statusCode = 400;
        throw error;
      }
    } else {
      const error = new Error('Bad Request');
      error.statusCode = 400;
      throw error;
    }
  } catch (err) {
    const { statusCode, message } = err;

    if (statusCode) {
      res.status(statusCode).send({
        error: message,
        statusCode,
      });
    } else {
      next(err);
    }
  }
};

module.exports = post;
