const { compare } = require("bcryptjs");

const { getUserById } = require("../../../database/queries/getUser");
const deleteUser = require("../../../database/queries/deleteUser");
const sendEmail = require("../../utils/sendEmail");
const { deleted: deletedTemplate } = require("../../../templates");

module.exports = async (req, res, next) => {
  try {
    const dbRes = await getUserById(1);
    const admin = dbRes.rows[0];

    const passIsValid = await compare(req.body.password, admin.password);
    if (!passIsValid)
      return res
        .status(401)
        .send({ error: "Please check your password", statusCode: 401 });

    const { userId } = req.params;
    const deletedUser = (await deleteUser(userId)).rows[0];
    sendEmail(
      deletedUser.email,
      deletedTemplate(`${deletedUser.first_name} ${deletedUser.last_name}`)
    );
    return res.send({ data: { id: deletedUser.id }, statusCode: 200 });
  } catch (e) {
    return next(e);
  }
};
