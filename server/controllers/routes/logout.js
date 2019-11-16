module.exports = (req, res) => {
    res.clearCookie("jwt");
    res.send({ statusCode: 200, message: "logged out successfully " });
};
