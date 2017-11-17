const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    if (req.session.user) {
      res.render('reviews/new_review');
    } else {
      res.redirect('/');
    }
  });

module.exports = router;
