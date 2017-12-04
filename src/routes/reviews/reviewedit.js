const router = require('express').Router();
const getReviewById = require('../../db/reviews.js').getReviewById;
const editReview = require('../../db/reviews.js').editReview;

router.get('/:id', (req, res) => {
  const postId = req.params;
  return getReviewById(postId.id)
    .then((review) => {
      if (req.session.user !== review.user_id) {
        res.redirect('../../error_rendering/forbidden');
      } else {
        res.render('reviews/review_edit', { review });
      }
    })
    .catch(console.error);
});

router.post('/:id', (req, res) => {
  const { id, title, content } = req.body;
  return editReview(id, title, content)
    .then((review) => {
      res.redirect('/profile');
    });
});


module.exports = router;
