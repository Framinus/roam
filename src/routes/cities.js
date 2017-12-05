const router = require('express').Router();
const getReviewsForCity = require('../db/cities.js').getReviewsForCity;

router.get('/', (req, res) => {
  if (req.session.user) {
    res.render('cities/city_intro');
  } else {
    res.redirect('/');
  }
});

router.get('/:city', (req, res) => {
  if (req.session.user) {
    const city = req.params.city;
    return getReviewsForCity(city)
      .then((reviews) => {
        res.render(`cities/${city}`, { reviews });
      })
      .catch(console.error);
  } else {
    res.redirect('/');
  }
});

module.exports = router;
