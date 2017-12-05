const router = require('express').Router();
const getUserReviews = require('../db/users.js').getUserReviews;
const getUserProfile = require('../db/users.js').getUserProfile;
const editUserProfile = require('../db/users.js').editUserProfile;
const moment = require('moment');

const findUser = (req, res, next) => {
  if (req.session.user) {
    const { user } = req.session;
    return getUserProfile(user)
      .then((profile) => {
        const formattedDate = moment(profile.join_date).format('MM-DD-YYYY');
        const formattedProfile = {
          id: profile.id,
          name: profile.name,
          current_city: profile.current_city,
          image_url: profile.image_url,
          join_date: formattedDate,
        };
        req.userProfile = formattedProfile;
        next();
      })
      .catch(console.error);
  } else {
    res.redirect('/');
  }
};

const findReviews = (req, res, next) => {
  const { user } = req.session;
  return getUserReviews(user)
    .then((reviews) => {
      if (reviews[0] === undefined) {
        req.noReviews = {
          title: 'No reviews yet...',
          content: 'Go to a city page to begin!',
        };
        next();
      } else {
        req.userReviews = reviews;
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      next();
    });
};

const renderProfilePage = (req, res) => {
  res.render('profile', {
    user: req.userProfile,
    reviews: req.userReviews,
    noreviews: req.noReviews,
  });
};

router.get('/', findUser, findReviews, renderProfilePage);

router.post('/', (req, res) => {
  const { id, name, currentcity } = req.body;
  return editUserProfile(id, name, currentcity)
    .then(result => res.json())
    .catch(console.error);
});


module.exports = router;
