const router = require('express').Router();
const getReviewsForCity = require('../../db/cities').getReviewsForCity;

router.route('/')
  .get((req, res) => {
    return getReviewsForCity(3)
      .then((reviews) => {
        res.render('cities/oakland', { reviews });
      })
      .catch((err) => {
        console.error(err);
      });
  });


module.exports = router;
