const router = require('express').Router();
const signup = require('./auth/signup');
const login = require('./auth/login');
const profile = require('./profile');
const cities = require('./cities');
const newreview = require('./reviews/newreview');
const reviewedit = require('./reviews/reviewedit');
const editprofile = require('./profile/editprofile');
const reviewfull = require('./reviews/reviewfull');
const forbidden = require('./error_rendering/forbidden');

router.get('/', (req, res) => {
  res.render('home/index');
});

router.post('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

router.use('/auth/signup', signup);
router.use('/auth/login', login);
router.use('/profile', profile);
router.use('/cities', cities);
router.use('/reviews/newreview', newreview);
router.use('/reviews/reviewedit', reviewedit);
router.use('/profile/editprofile', editprofile);
router.use('/reviews/reviewfull', reviewfull);
router.use('/error_rendering/forbidden', forbidden);


module.exports = router;
