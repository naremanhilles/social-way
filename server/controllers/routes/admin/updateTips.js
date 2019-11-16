const updateTipsDB = require("../../../database/queries/updateTip");

module.exports = async (req, res, next) => {
  const { body: data } = req;
  try {
    if (data.type === "publicService") {
      const responseBody = await Promise.all(
        ["image", "description", "title"].map(key =>
          updateTipsDB("publicService", key, data[key])
        )
      );
      res.send({ statusCode: 200, data: responseBody });
    } else if (data.type === "event") {
      const responseBody = await Promise.all(
        ["image", "description", "title"].map(key =>
          updateTipsDB("event", key, data[key])
        )
      );
      res.send({ statusCode: 200, data: responseBody });
    }
  } catch (e) {
    next(e);
  }
};
