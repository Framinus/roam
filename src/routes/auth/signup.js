const router = require('express').Router();
const createUser = require('../../db/users.js').createUser;
const saltPassword = require('../../db/users.js').saltPassword;

const saltRounds = 10;

router.route('/')
  .get((req, res) => {
    res.render('auth/signup', { badInfo: '' });
  })

  .post((req, res) => {
    const { name, email, password, currentcity } = req.body;
    const date = new Date();
    const imageurl = 'https://vignette.wikia.nocookie.net/jamesbond/images/6/61/Generic_Placeholder_-_Profile.jpg/revision/latest?cb=20121227201208';
    saltPassword(password, saltRounds)
      .then((hash) => {
        return createUser(name, email, hash, imageurl, currentcity, date);
      })
      .then((userInfo) => {
        if (userInfo.name != 'error') {
          res.redirect('./login');
        } else {
          res.render('auth/signup', { badInfo: 'User already exists' });
        }
      })
      .catch(console.error);
  });

module.exports = router;
