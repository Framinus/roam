const router = require('express').Router();
const getReviewsForCity = require('../../db/cities').getReviewsForCity;

router.route('/')
  .get((req, res) => {
    if (req.session.user) {
      return getReviewsForCity(3)
        .then((reviews) => {
          res.render('cities/oakland', { reviews });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      res.redirect('/');
    }
  });


module.exports = router;
