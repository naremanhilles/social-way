const {
  acceptUser,
  rejectUser
} = require("../../../database/queries/updatePendingUser");
const sendEmail = require("../../utils/sendEmail");
const {
  accepted: acceptedTemplate,
  rejected: rejectedTemplate
} = require("../../../templates");
exports.acceptUser = async (req, res, next) => {
  try {
    const acceptedUser = (await acceptUser(req.params.userId)).rows[0];
    await sendEmail(
      acceptedUser.email,
      acceptedTemplate(`${acceptedUser.first_name} ${acceptedUser.last_name}`)
    );
    res.send({ data: { id: acceptedUser.id }, statusCode: 200 });
  } catch (e) {
    next(e);
  }
};

exports.rejectUser = async (req, res, next) => {
  try {
    const rejectedUser = (await rejectUser(req.params.userId)).rows[0];
    await sendEmail(
      rejectedUser.email,
      rejectedTemplate(`${rejectedUser.first_name} ${rejectedUser.last_name}`)
    );
    res.send({ data: { id: rejectedUser.id }, statusCode: 200 });
  } catch (e) {
    next(e);
  }
};
