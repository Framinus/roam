const router = require('express').Router();
const signup = require('./auth/signup');
const login = require('./auth/login');
const profile = require('./profile');
const cities = require('./cities');
const hongkong = require('./cities/1');
const newyork = require('./cities/2');
const oakland = require('./cities/3');
const newreview = require('./reviews/newreview');
const reviewedit = require('./reviews/reviewedit');
const editprofile = require('./profile/editprofile');
const reviewfull = require('./reviews/reviewfull');

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
router.use('/cities', cities);
router.use('/cities/1', hongkong);
router.use('/cities/2', newyork);
router.use('/cities/3', oakland);
router.use('/reviews/newreview', newreview);
router.use('/reviews/reviewedit', reviewedit);
router.use('/profile/editprofile', editprofile);
router.use('/reviews/reviewfull', reviewfull);


module.exports = router;
