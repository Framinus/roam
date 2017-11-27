const router = require('express').Router();
const editUserProfile = require('../../db/users.js').editUserProfile;

router.get('/', (req, res) => {
  res.render('profile/editprofile');
});

router.post('/', (req, res) => {
  const { id, name, currentcity, imageUrl } = req.body;
  editUserProfile(id, name, currentcity, imageUrl)
    .then((profile) => {
      res.redirect('/profile');
    })
    .catch(console.error);
});

module.exports = router;
