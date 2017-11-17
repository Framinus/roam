const router = require('express').Router();
const getUserProfile = require('../db/users.js').getUserProfile;

router.get('/', (req, res) => {
  if (req.session.user) {
    const { user } = req.session;
    getUserProfile(user)
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
