const router = require('express').Router();
const createReview = require('../../db/reviews.js').createReview;

router.get('/', (req, res) => {
  const userId = req.session.user;
  if (req.session.user) {
    res.render('reviews/new_review', { userId });
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
