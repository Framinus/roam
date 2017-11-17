const router = require('express').Router();
const getUserProfileAndReviews = require('../db/users.js').getUserProfileAndReviews;
const editUserProfile = require('../db/users.js').editUserProfile;

router.get('/', (req, res) => {
  if (req.session.user) {
    const { user } = req.session;
    console.log('user in get route', user);
    getUserProfileAndReviews(user)
      .then((profile) => {
        res.render('profile', { profile });
      })
      .catch(console.error);
  } else {
    res.redirect('/');
  }
});

router.post('/', (req, res, next) => {
  const { name, currentcity, imageUrl } = req.body;
  console.log('name', name);
  editUserProfile(user, name, currentcity, imageUrl)
    .then((editedProfile) => {
      next();
    })
    .catch(console.error);
});

module.exports = router;
