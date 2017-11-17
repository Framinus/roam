const router = require('express').Router();
const getReviewsForCity = require('../../db/cities.js').getReviewsForCity;

router.route('/')
  .get((req, res) => {
    if (req.session.user) {
      return getReviewsForCity(2)
        .then((reviews) => {
          res.render('cities/new_york', { reviews });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      res.redirect('/');
    }
  });


module.exports = router;
