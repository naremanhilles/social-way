const router = require('express').Router();

const {
  user, post, login, logout, isAuth, admin,
} = require('./routes');
const { post: userPost } = require('./routes/user/post');
const unlockCookie = require('./middlewares/unlockCookie');

router.post('/login', login);
router.post('/user', userPost);
router.use(unlockCookie);
router.use('/user', user);
router.use('/post', post);
router.use('/admin', admin);
router.get('/isAuth', isAuth);
router.get('/logout', logout);

module.exports = router;
