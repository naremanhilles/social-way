const connect = require('./../config/connection');

exports.getEventTopics = () => connect.query('SELECT * FROM topic');
