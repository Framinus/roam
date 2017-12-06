const router = require('express').Router();
const validateUser = require('../../db/users.js').validateUser;
const bcrypt = require('bcrypt');

router.route('/')
  .get((req, res) => {
    res.render('auth/login', { alert: '' });
  })

  .post((req, res) => {
    const { email, password } = req.body;
    let user;
    return validateUser(email)
      .then((userInfo) => {
        if (userInfo) {
          user = userInfo.id;
          return bcrypt.compare(password, userInfo.password);
        }
        res.render('auth/login', { alert: 'Incorrect email or password' });
      })
      .then((comparison) => {
        if (comparison) {
          req.session.user = user;
          // what is this line doing? I don't think I'm actually using it.
          res.locals.user = user;
          res.redirect('/profile');
        } else {
          res.render('auth/login', { alert: 'Incorrect email or password' });
        }
      })
      .catch((err) => {
        console.error(err, 'failed to validate user.');
      });
  });

module.exports = router;
