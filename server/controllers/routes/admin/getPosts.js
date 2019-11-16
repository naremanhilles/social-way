const {
  getEventsByQuery,
  getPublicServicesByQuery
} = require("../../../database/queries/getPosts");

module.exports = async (req, res) => {
  const { post_type: postType, post_query: postQuery } = req.headers;
  if (postType === "event") {
    const events = (await getEventsByQuery(postQuery)).rows;
    const filteredEvents = {};
    events.map(event => {
      if (!filteredEvents[event.id]) {
        filteredEvents[event.id] = event;
        filteredEvents[event.id].topics = [event.topic];
        filteredEvents[event.id].key = event.id // For React (key)
      } else {
        filteredEvents[event.id].topics.push(event.topic);
      }
    });
    res.send({ statusCode: 200, data: Object.values(filteredEvents) });
  } else if (postType === "publicService") {
    const services = (await getPublicServicesByQuery(postQuery)).rows;
    const filteredServices = {};
    services.map(service => {
      if (!filteredServices[service.id]) {
        filteredServices[service.id] = service;
        filteredServices[service.id].secondaryTags = [service.secondary_tag];
        filteredServices[service.id].key = service.id;
      } else {
        filteredServices[service.id].secondaryTags.push(service.secondary_tag);
      }
    });
    res.send({ statusCode: 200, data: Object.values(filteredServices) });
  } else {
    return res.status(400).send({ statusCode: 400, message: "Bad Request" });
  }
};
