const router = require('express').Router();
const createReview = require('../../db/reviews.js').createReview;
const getCityName = require('../../db/cities.js').getCityName;

router.get('/:city', (req, res) => {
  const userId = req.session.user;
  const city = req.params;
  if (req.session.user) {
    return getCityName(city.city)
      .then((cityName) => {
        res.render('reviews/new_review',
          {
            userId,
            cityName,
          });
      })
      .catch(console.error);
  } else {
    res.redirect('/');
  }
});

router.post('/', (req, res) => {
  const { userId, cityId, title, content } = req.body;
  createReview(userId, cityId, title, content)
    .then((review) => {
      if (review) {
        res.redirect('/profile');
      }
    })
    .catch(console.error);
});


module.exports = router;
