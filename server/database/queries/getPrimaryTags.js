const connect = require("./../config/connection");

exports.getPrimaryTags = () =>
  connect.query(`SELECT * FROM primary_tag `);
