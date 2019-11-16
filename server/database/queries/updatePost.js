const connection = require('../config/connection');

exports.updateEventQuery = (
  eventId,
  {
    title,
    description,
    category,
    eventStartDatetime,
    eventEndDatetime,
    venue,
    website,
    cost,
    focusKey,
    meta,
    altText,
    isDraft,
    publishDatetime,
  },
  imageName,
) => {
  if (imageName) {
    return connection.query(
      'UPDATE event SET title = $1, description = $2, category = $3, event_start_datetime = $4, event_end_datetime = $5, venue = $6, website = $7, image = $8, cost = $9, focus_key = $10, meta = $11, alt_text = $12, is_draft = $13, publish_datetime = $14 WHERE id = $15;',
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
        publishDatetime,
        eventId,
      ],
    );
  }
  return connection.query(
    'UPDATE event SET title = $1, description = $2, category = $3, event_start_datetime = $4,event_end_datetime = $5, venue = $6, website = $7, cost = $8, focus_key = $9, meta = $10, alt_text = $11, is_draft = $12, publish_datetime = $13 WHERE id = $14;',
    [
      title,
      description,
      category,
      eventStartDatetime,
      eventEndDatetime,
      venue,
      website,
      cost,
      focusKey,
      meta,
      altText,
      isDraft,
      publishDatetime,
      eventId,
    ],
  );
};

exports.deleteTopicQuery = eventId => connection.query('DELETE FROM event_topic WHERE event_id = $1;', [eventId]);

exports.updatePublicServiceQuery = (
  publicServiceId,
  {
    primaryTag, description, focusKey, altText, meta, publishDatetime, title, isDraft,
  },
  imageName,
) => {
  if (imageName) {
    return connection.query(
      'UPDATE public_service SET primary_tag = $1, description = $2, image = $3, focus_key = $4, alt_text = $5, meta = $6, publish_datetime = $7, title = $8, is_draft = $9 WHERE id = $10;',
      [
        primaryTag,
        description,
        imageName,
        focusKey,
        altText,
        meta,
        publishDatetime,
        title,
        isDraft,
        publicServiceId,
      ],
    );
  }
  return connection.query(
    'UPDATE public_service SET primary_tag = $1, description = $2, focus_key = $3, alt_text = $4, meta = $5, publish_datetime = $6, title = $7, is_draft = $8 WHERE id = $9;',
    [
      primaryTag,
      description,
      focusKey,
      altText,
      meta,
      publishDatetime,
      title,
      isDraft,
      publicServiceId,
    ],
  );
};

exports.deleteSecondaryTagQuery = publicServiceId => connection.query('DELETE FROM public_service_tag WHERE public_service_id = $1;', [
  publicServiceId,
]);
