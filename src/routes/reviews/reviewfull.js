const router = require('express').Router();
const getReviewById = require('../../db/reviews.js').getReviewById;
const deleteReview = require('../../db/reviews.js').deleteReview;

router.get('/:id', (req, res) => {
  if (req.session.user) {
    const postId = req.params;
    return getReviewById(postId.id)
      .then((review) => {
        res.render('reviews/review_full', { review });
      })
      .catch(console.error);
  } else {
    res.redirect('/auth/login');
  }
});

router.post('/:id', (req, res) => {
  const postId = req.params;
  return deleteReview(postId.id)
    .then((result) => {
      res.redirect('/profile');
    })
    .catch(console.error);
});


module.exports = router;
