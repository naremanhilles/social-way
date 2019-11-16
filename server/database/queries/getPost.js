const connect = require('./../config/connection');

exports.getEvent = (eventId, userId) => connect.query(
  `SELECT
  event.*,topic.topic, event_topic.topic_id, event.category as event_category,"user".organisation_name,event_category.category
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
   event.id=$1
  AND
   publisher_id=$2`,
  [eventId, userId],
);

exports.getPublicService = (publicServiceId, userId) => connect.query(
  `SELECT
  public_service.*, public_service_tag.secondary_tag as secondary_tag_id, secondary_tag.tag as secondary_tag,"user".organisation_name,primary_tag.tag
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
      public_service.id=$1
    AND
      publisher_id=$2`,
  [publicServiceId, userId],
);
