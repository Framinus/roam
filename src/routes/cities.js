const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    if (req.session.user) {
      res.render('cities/city_intro');
    } else {
      res.redirect('/');
    }
  });

router.get('/cities/:city', (req, res) => {
  const city = req.params.city;
  res.render(`cities/${city}`);
});

module.exports = router;
