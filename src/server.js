require('dotenv').config();
const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const validateUser = require('./db/users').validateUser;
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const path = require('path');

passport.use(new Strategy((username, password, done) => {
  validateUser(username, (err, user) => {
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


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  store: new pgSession({
    conString: process.env.DATABASE_URL,
  }),
  key: 'user_sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10 * 10 * 6000000 },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
