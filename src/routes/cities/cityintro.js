const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    if (req.session.user) {
      res.render('cities/city_intro');
    } else {
      res.redirect('/');
    }
  });


module.exports = router;
