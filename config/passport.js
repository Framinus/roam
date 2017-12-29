// setting this up to use a variety of passport strategies later on. 

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { createUser, validateUser } = require('../src/db/users');

module.exports = function (passport) {
  passport.use('signup', new LocalStrategy((name, email, password, imageurl, currentcity, date, done) => {
    return createUser(name, email, password, imageurl, currentcity, date)
      .then((newUser) => {
        if (newUser) {
          return done(null, newUser);
        }
      })
      .catch((error) => {
        done(error, false);
      });
  }));

  passport.use('login', new LocalStrategy((username, password, done) => {
    return validateUser(username, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (bcrypt.compare(password, user.password)) { return done(null, false); }
      return done(null, user);
    });
  }));

  passport.serializeUser((id, done) => {
    validateUser(id, (err, user) => {
      if (err) { return done(err); }
      done(null, user);
    });
  });

  passport.deserializeUser((id, done) => {
    validateUser(id, (err, user) => {
      if (err) { return done(err); }
      done(null, user);
    });
  });
};
