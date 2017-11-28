const router = require('express').Router();
const getReviewById = require('../../db/reviews.js').getReviewById;

router.get('/:id', (req, res) => {
  if (req.session.user) {
    const postId = req.params;
    return getReviewById(postId.id)
      .then((review) => {
        console.log("review object being passed in", review)
        res.render('reviews/review_full', { review });
      })
      .catch(console.error);
  } else {
    res.redirect('/auth/login');
  }
});


module.exports = router;
