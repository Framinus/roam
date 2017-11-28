const router = require('express').Router();
const getReviewById = require('../../db/reviews.js').getReviewById;
const editReview = require('../../db/reviews.js').editReview;

router.get('/:id', (req, res) => {
  if (req.session.user) {
    const postId = req.params;
    return getReviewById(postId.id)
      .then((review) => {
        console.log("review object being passed in", review)
        res.render('reviews/review_edit', { review });
      })
      .catch(console.error);
  } else {
    res.redirect('/auth/login');
  }
});

router.post('/:id', (req, res) => {
  const { id, title, content } = req.body;
  console.log("id being passed into editReview", id);
  return editReview(id, title, content)
    .then((review) => {
      console.log('edited review', review);
      res.redirect('/profile');
    });
});

module.exports = router;
