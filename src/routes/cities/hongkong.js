const router = require('express').Router();
const getReviewsForCity = require('../../db/cities.js').getReviewsForCity;

router.route('/')
  .get((req, res) => {
    if (req.session.user) {
      return getReviewsForCity(1)
        .then((reviews) => {
          res.render('cities/hong_kong', { reviews });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      res.redirect('/');
    }
  });


module.exports = router;
