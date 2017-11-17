const router = require('express').Router();
const signup = require('./auth/signup');
const login = require('./auth/login');
const profile = require('./profile');
const hongkong = require('./cities/hongkong');
const newyork = require('./cities/newyork');
const cityintro = require('./cities/cityintro');
const oakland = require('./cities/oakland');
const newpost = require('./reviews/newreview');
const reviewdetail = require('./reviews/reviewdetail');
const newreview = require('./reviews/newreview');

router.get('/', (req, res) => {
  res.render('home/index');
});

router.post('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
});

router.use('/auth/signup', signup);
router.use('/auth/login', login);
router.use('/profile', profile);
router.use('/cities/hongkong', hongkong);
router.use('/cities/newyork', newyork);
router.use('/cities/cityintro', cityintro);
router.use('/cities/oakland', oakland);
router.use('/reviews/newpost', newpost);
router.use('/reviews/reviewdetail', reviewdetail);
router.use('/reviews/newreview', newreview);


module.exports = router;
