const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    if (req.session.user) {
      res.render('review_detail');
    } else {
      res.redirect('/');
    }
  });

module.exports = router;
