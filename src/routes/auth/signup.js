const router = require('express').Router();
const createUser = require('../../db/users.js').createUser;
const bcrypt = require('bcrypt');

const saltRounds = 10;

router.route('/')
  .get((req, res) => {
    res.render('auth/signup', { badInfo: '' });
  })

  .post((req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, saltRounds)
      .then((hash) => {
        return createUser(name, email, hash)
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
