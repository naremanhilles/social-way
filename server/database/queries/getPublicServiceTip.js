const connect = require('../config/connection');

exports.getPublicServiceTip = () => connect.query('SELECT * FROM tip WHERE id IN(1,2)');
