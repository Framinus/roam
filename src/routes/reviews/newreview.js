const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    console.log(req.session.user);
    if (req.session.user) {
      res.render('reviews/new_review');
    } else {
      res.redirect('/');
    }
  });

module.exports = router;
