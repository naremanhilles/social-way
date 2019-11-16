const router = require('express').Router();

const { get } = require('./get');
const { post } = require('./post');
const { updateBusiness } = require('./business');
const { updatePassword } = require('./password');
const { updatePersonal } = require('./personal');
const updateProfilePic = require('./updateProfilePic');

router
  .route('/')
  .get(get)
  .post(post);
router.put('/password', updatePassword);
router.put('/business', updateBusiness);
router.post('/edit-pic', updateProfilePic);
router.put('/personal', updatePersonal);

module.exports = router;
