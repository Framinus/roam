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
    saltPassword(password, saltRounds)
      .then((hash) => {
        return createUser(name, email, hash, currentcity)
      })
      .then((userInfo) => {
        if (userInfo.name != 'error') {
          res.redirect('./login');
        } else {
          res.render('auth/signup', { badInfo: 'User already exists' });
        }
      })
      .catch((err) => {
        // console.error(err, 'something bad');
      });
  });

module.exports = router;
