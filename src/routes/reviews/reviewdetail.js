const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    res.render('review_detail');
  });

module.exports = router;
