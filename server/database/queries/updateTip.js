const connection = require("../config/connection");

module.exports = (postType, tipName, decsription) =>
  connection.query(
    "UPDATE tip SET tip_description=$1 WHERE post_type=$2 and tip_title=$3 RETURNING *",
    [decsription, postType, tipName]
  );
