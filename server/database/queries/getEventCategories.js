const connect = require('./../config/connection');

exports.getEventCategory = () => connect.query('SELECT * FROM event_category');
