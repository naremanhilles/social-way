const connect = require("./../config/connection");

exports.getSecondaryTags = () =>
  connect.query(`SELECT * FROM secondary_tag `);
