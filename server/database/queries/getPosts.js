const connection = require("../config/connection");

const getEvents = (isDraft, publisherId) =>
  connection.query(
    `
  SELECT event.id, event_category.category, title
  FROM event 
  INNER JOIN event_category ON event_category.id = event.category 
  WHERE is_draft = $1 and publisher_id = $2
`,
    [isDraft, publisherId]
  );

const getPublicServices = (isDraft, publisherId) =>
  connection.query(
    `
  SELECT public_service.id, tag, title
  FROM public_service 
  INNER JOIN primary_tag ON primary_tag.id = public_service.primary_tag
  WHERE is_draft = $1 and publisher_id = $2
`,
    [isDraft, publisherId]
  );

const getEventsByQuery = (query = "") => {
  return connection.query(
    `SELECT
  event.*,topic.topic,"user".organisation_name,event_category.category
  FROM
   event
  INNER JOIN
    "user" 
  ON
   "user".id = event.publisher_id
  INNER JOIN
   event_category
  ON
   event_category.id = event.category
  INNER JOIN
   event_topic
  ON
   event_topic.event_id = event.id
  INNER JOIN
   topic
  ON
   topic.id = event_topic.topic_id
  WHERE
  LOWER("user".organisation_name) like $1`,
    ["%" + query.toLowerCase() + "%"]
  );
};

const getPublicServicesByQuery = query =>
  connection.query(
    `SELECT
  public_service.*,secondary_tag.tag as secondary_tag,"user".organisation_name,primary_tag.tag
    FROM
      public_service
    INNER JOIN
      "user" 
    ON
      "user".id = public_service.publisher_id
    INNER JOIN
      primary_tag
    ON
      primary_tag.id = public_service.primary_tag
    INNER JOIN
      public_service_tag
    ON
      public_service_tag.public_service_id = public_service.id
    INNER JOIN
      secondary_tag
    ON
      secondary_tag.id = public_service_tag.secondary_tag
    WHERE
      LOWER("user".organisation_name) like $1`,
    ["%" + query.toLowerCase() + "%"]
  );

module.exports = {
  getEvents,
  getPublicServices,
  getEventsByQuery,
  getPublicServicesByQuery
};
