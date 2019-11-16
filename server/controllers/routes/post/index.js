const router = require("express").Router();

const draftPosts = require("./getDraftPosts");
const put = require("./put");
const livePosts = require("./getLivePosts");
const deletePost = require("./delete");
const post = require("./post");
const { get } = require("./get");
const eventStatic = require("./eventStatic");
const publicServiceStatic = require("./publicServiceStatic");
const postEventCategory = require("./postEventCategory");
const deleteEventCategory = require("./deleteEventCategory");
const deleteEeventTopic = require("./deleteEventTopic");
const postEventTopic = require("./postEventTopic");
const deletePublicPrimary = require("./deletePublicServicePrimary");
const deletePublicSecondary = require("./deletePublicServicePSecondary");
const postPublicServicePrimary = require("./postPublicServicePrimary");
const postPublicServiceSecondary = require("./postPublicServicePSecondary");
const getTips = require("./getTips");

router.post("/", post);

router.get("/draft", draftPosts);

router.get("/live", livePosts);

router.get("/event/static", eventStatic);

router.get("/public-service/static", publicServiceStatic);

router
  .route("/event/category")
  .post(postEventCategory)
  .delete(deleteEventCategory);

router
  .route("/event/topic")
  .post(postEventTopic)
  .delete(deleteEeventTopic);

router
  .route("/public-service/primary-tag")
  .post(postPublicServicePrimary)
  .delete(deletePublicPrimary);

router
  .route("/public-service/secondary-tag")
  .post(postPublicServiceSecondary)
  .delete(deletePublicSecondary);

router.get("/tips", getTips);

router
  .route("/:postId")
  .get(get)
  .put(put)
  .delete(deletePost);

module.exports = router;
