const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('error_rendering/forbidden');
});

module.exports = router;
