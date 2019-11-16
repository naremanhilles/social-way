const connect = require("../config/connection");

module.exports = () => connect.query("SELECT * FROM tip;");
