const db = require('./db.js');

const createReview = (userId, cityId, title, content) => {
  return db.one(`INSERT INTO reviews (user_id, city_id, title, content)
  VALUES ($1, $2, $3, $4) RETURNING *`,
    [userId, cityId, title, content])
    .catch((err) => {
      console.error(err, 'failed to create review');
    });
};

const deleteReview = (id) => {
  return db.one(`DELETE FROM reviews WHERE id=$1::int
    RETURNING *`, id)
    .catch((err) => {
      console.error(err, 'Error deleting review from db');
    });
};

const editReview = (id, title, content) => {
  return db.one(`UPDATE reviews
  SET title=$2, content=$3
  WHERE id=$1
  RETURNING *`,
    [id, title, content])
    .catch((err) => {
      console.error(err, 'Failed to edit review');
    });
};

const getReviewById = (id) => {
  return db.one(`SELECT * FROM reviews WHERE id=$1`, id)
    .catch((err) => {
      console.error(err, 'Failed to get review');
    });
};

const getReviewAndUser = (reviewId) => {
  return db.one(`SELECT users.name, users.image_url, cities.name, reviews.id, reviews.user_id, reviews.title, reviews.content
      FROM reviews
      JOIN users
      ON reviews.user_id = users.id
      JOIN cities
      ON reviews.city_id = cities.id
      WHERE reviews.id=$1
      `, reviewId);
};

module.exports = { createReview, deleteReview, editReview, getReviewAndUser, getReviewById };
