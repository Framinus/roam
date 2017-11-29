const router = require('express').Router();
const getReviewsForCity = require('../db/cities.js').getReviewsForCity;


router.get('/', (req, res) => {
  if (req.session.user) {
    res.render('cities/city_intro');
  } else {
    res.redirect('/auth/login');
  }
});

router.get('/:city', (req, res) => {
  if (req.session.user) {
    const city = req.params.city;
    console.log(city);
    return getReviewsForCity(city)
      .then((reviews) => {
        res.render(`cities/${city}`, { reviews });
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    res.redirect('/auth/login');
  }
});

module.exports = router;
