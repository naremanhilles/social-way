const { unlink } = require('fs');
const { join } = require('path');
const { promisify } = require('util');

const { eventSchema, publicServiceSchema } = require('../../utils/postSchema');
const {
  updateEventQuery,
  deleteTopicQuery,
  updatePublicServiceQuery,
  deleteSecondaryTagQuery,
} = require('../../../database/queries/updatePost');
const getPostPublisher = require('../../../database/queries/getPostPublisher');
const getPostImg = require('../../../database/queries/getPostImg');
const { addTopic, addSecondaryTag } = require('../../../database/queries/postEvent');

const updateEvent = async (req, res, next) => {
  const { postId: eventId } = req.params;

  try {
    const publisherId = await getPostPublisher('event', eventId);
    if (publisherId !== req.user.id) return res.status(401).send({ error: 'Unauthorized', statusCode: 401 });

    const { eventTopic } = req.body;

    const schemaValidation = await eventSchema.isValid(req.body);
    if (!schemaValidation) return res.status(400).send({ error: 'Bad Request', statusCode: 400 });

    let imageName;
    if (req.files && req.files.image) {
      const { image } = req.files;
      imageName = Date.now() + image.name;

      const moveImg = promisify(image.mv);
      const deleteImg = promisify(unlink);
      await moveImg(join(__dirname, '..', '..', '..', 'uploads', imageName));
      const imgDir = await getPostImg('event', eventId);
      await deleteImg(join(__dirname, '..', '..', '..', 'uploads', imgDir));
    }
    await updateEventQuery(eventId, req.body, imageName);
    await deleteTopicQuery(eventId);
    await Promise.all(eventTopic.map(topic => addTopic(eventId, topic)));
    return res.send({ data: { ...req.body, id: eventId }, statusCode: 200 });
  } catch (e) {
    if (e.message === "Cannot read property 'publisher_id' of undefined") res.status(400).send({ statusCode: 400, error: 'Bad Request' });
    return next(e);
  }
};

const updatePublicService = async (req, res, next) => {
  const { postId: publicServiceId } = req.params;
  try {
    const publisherId = await getPostPublisher('public_service', publicServiceId);
    if (publisherId !== req.user.id) return res.status(401).send({ error: 'Unauthorized', statusCode: 401 });

    const { secondaryTag } = req.body;

    const schemaValidation = await publicServiceSchema.isValid(req.body);
    if (!schemaValidation) return res.status(400).send({ error: 'Bad Request', statusCode: 400 });

    let imageName = '';
    if (req.files && req.files.image) {
      const { image } = req.files;
      if (image.size >= (500 * 1024 * 1024)) {
        return res.send({ statusCode: 400, data: 'Bad Request' });
      }
      imageName = Date.now() + image.name;

      const moveImg = promisify(image.mv);
      const deleteImg = promisify(unlink);

      await moveImg(join(__dirname, '..', '..', '..', 'uploads', imageName));
      const imgDir = await getPostImg('public_service', publicServiceId);
      if (imgDir) await deleteImg(join(__dirname, '..', '..', '..', 'uploads', imgDir));

    }
    await updatePublicServiceQuery(publicServiceId, req.body, imageName);
    await deleteSecondaryTagQuery(publicServiceId);
    await Promise.all(secondaryTag.map(tag => addSecondaryTag(publicServiceId, tag)));
    req.body.primary_tag = req.body.primaryTag;
    return res.send({ data: { ...req.body, id: publicServiceId }, statusCode: 200 });
  } catch (e) {
    return next(e);
  }
};

module.exports = (req, res, next) => {
  req.body = JSON.parse(req.body.data);
  const { type } = req.body;
  if (type === 'event') updateEvent(req, res, next);
  else if (type === 'public_services') updatePublicService(req, res, next);
  else res.status(400).send({ error: 'Unsupported type of post', statusCode: 400 });
};
