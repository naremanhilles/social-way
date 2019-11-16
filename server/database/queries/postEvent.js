const connection = require('../config/connection');

const addEvent = ({
  title,
  description,
  category,
  imageName,
  eventStartDatetime,
  eventEndDatetime,
  venue,
  website,
  cost,
  focusKey,
  meta,
  altText,
  isDraft,
  publisherId,
  publishDatetime,
}) => connection.query(`
	INSERT INTO event
		(title, description, category, event_start_datetime, event_end_datetime, venue, website, image, cost, focus_key, meta, alt_text, is_draft, publisher_id, publish_datetime)
	VALUES 
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) 
  RETURNING *;`,
  [
    title,
    description,
    category,
    eventStartDatetime,
    eventEndDatetime,
    venue,
    website,
    imageName,
    cost,
    focusKey,
    meta,
    altText,
    isDraft,
    publisherId,
    publishDatetime,
  ]
);

const addTopic = (eventId, topicId) => connection.query(`
        INSERT INTO event_topic
        (event_id, topic_id)
        VALUES 
              ($1, $2)
        RETURNING *`,
  [
    eventId,
    topicId
  ]
);

const addPublicServices = ({
  primaryTag,
  description,
  imageName,
  focusKey,
  altText,
  meta,
  publisherId,
  publishDatetime,
  title,
  isDraft
}) => connection.query(`
  INSERT INTO public_service
    (primary_tag, description, image, focus_key, alt_text, meta, publisher_id, publish_datetime, title, is_draft)
  VALUES 
              ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
      RETURNING *`,
  [
    primaryTag,
    description,
    imageName,
    focusKey,
    altText,
    meta,
    publisherId,
    publishDatetime,
    title,
    isDraft
  ]
);

const addSecondaryTag = (publicServiceId, secondaryTag) => connection.query(`
      INSERT INTO public_service_tag
              (public_service_id, secondary_tag)
      VALUES
              ($1, $2) 
      RETURNING *`,
  [
    publicServiceId,
    secondaryTag
  ]
);

module.exports = {
  addEvent,
  addTopic,
  addPublicServices,
  addSecondaryTag
};
