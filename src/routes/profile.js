const router = require('express').Router();
const getUserProfileAndReviews = require('../db/users.js').getUserProfileAndReviews;
const editUserProfile = require('../db/users.js').editUserProfile;

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
  const { id, name, currentcity } = req.body;
  return editUserProfile(id, name, currentcity)
    .then(response => res.json())
    .then(profile => profile)
    .catch(console.error);
});


module.exports = router;
