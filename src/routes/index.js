const routes = require('express').Router();
const signup = require('./auth/signup');
const login = require('./auth/login');
const profile = require('./profile');
const cities = require('./cities');
const newreview = require('./reviews/newreview');
const reviewedit = require('./reviews/reviewedit');
const reviewfull = require('./reviews/reviewfull');
const forbidden = require('./error_rendering/forbidden');

routes.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/profile');
  } else {
    res.render('home/index');
  }
});

routes.post('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

routes.use('/auth/signup', signup);
routes.use('/auth/login', login);
routes.use('/profile', profile);
routes.use('/cities', cities);
routes.use('/reviews/newreview', newreview);
routes.use('/reviews/reviewedit', reviewedit);
routes.use('/reviews/reviewfull', reviewfull);
routes.use('/error_rendering/forbidden', forbidden);


module.exports = routes;
