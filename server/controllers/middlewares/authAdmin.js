module.exports = (req, res, next) => {
  req.user.role === "admin"
    ? next()
    : res.status(401).send({ statusCode: 401, message: "Unauthorized" });
};
