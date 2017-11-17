const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    res.render('cities/city_intro');
  });


module.exports = router;
