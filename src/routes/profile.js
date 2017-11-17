const router = require('express').Router();
const getUserProfileAndReviews = require('../db/users.js').getUserProfileAndReviews;

router.get('/', (req, res) => {
  if (req.session.user) {
    const { user } = req.session;
    getUserProfileAndReviews(user)
      .then((profile) => {
        res.render('profile', { profile });
      })
      .catch(console.error);
  } else {
    res.redirect('/');
  }
});

router.post('/', (req, res) => {

});

module.exports = router;
