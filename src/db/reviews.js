const db = require('./db.js');

const createReview = (user_id, city_id, title, content) => {
  return db.one(`INSERT INTO reviews (user_id, city_id, title, content)
  VALUES ($1::int, $2::int, $3::text, $4::text) RETURNING *`,
    [user_id, city_id, title, content])
    .catch((err) => {
      console.error(err, 'failed to create review');
    });
};

const deleteReview = (id) => {
  return db.none(`DELETE FROM reviews WHERE id=$1::int`, id)
    .catch((err) => {
      console.error(err, 'Error deleting review from db');
    });
};

const editReview = (id, title, content) => {
  return db.one(`INSERT INTO reviews (title, content) VALUES ($2::text, $3::text)
  WHERE id=$1::int`,
    [id, title, content])
    .catch((err) => {
      console.error(err, 'Failed to edit review');
    });
};

module.exports = { createReview, deleteReview, editReview };
