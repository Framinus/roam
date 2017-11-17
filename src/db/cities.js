const db = require('./db.js');


const getCityAndReviews = (cityId) => {
  return db.any(`
    SELECT cities.name, reviews.title, reviews.content
    FROM cities
    JOIN reviews
    ON cities.id = reviews.city_id
    WHERE cities.id = $1
    `, cityId);
};

const getReviewsForCity = (cityID) => {
  return db.any(`
    SELECT users.name, users.image_url, reviews.title, reviews.content
    FROM users
    JOIN reviews
    ON users.id = reviews.user_id
    WHERE reviews.city_id = $1
    `, cityID);
};


module.exports = { getReviewsForCity, getCityAndReviews };
