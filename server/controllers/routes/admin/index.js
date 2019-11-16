const router = require("express").Router();

const getAllUsers = require("./getUsers");
const deleteUser = require("./deleteUser");
const getPosts = require("./getPosts");
const authAdmin = require("../../middlewares/authAdmin");
const changeUserStatus = require("./updatePendingUser");
const getTips = require("./getTips");
const updateTips = require("./updateTips");

router.use(authAdmin);
router.get("/all-users", getAllUsers.getAllUsers);
router.get("/pending-users", getAllUsers.getPendingUsers);
router.get("/accept-user/:userId", changeUserStatus.acceptUser);
router.get("/reject-user/:userId", changeUserStatus.rejectUser);
router.delete("/delete-user/:userId", deleteUser);
router.get("/posts", getPosts);
router
  .route("/tips")
  .get(getTips)
  .put(updateTips);

module.exports = router;
