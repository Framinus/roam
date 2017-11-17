const router = require('express').Router();
const getUserProfile = require('../db/users.js').getUserProfile;

router.get('/', (req, res) => {
  const { user } = req.session;
  console.log('req.session.user', req.session.user);
  getUserProfile(user)
    .then((profile) => {
      res.render('profile', { profile });
    })
    .catch(console.error);
});

router.post('/', (req, res) => {

});

module.exports = router;
