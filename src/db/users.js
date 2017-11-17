const db = require('./db.js');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const createUser = (name, email, password, currentcity) => {
  return db.oneOrNone(`
    INSERT INTO users (name, email, password, current_city)
    VALUES ($1, $2, $3, $4)
    RETURNING *`, [name, email, password, currentcity])
    .catch((err) => {
      return err;
    });
};

const deleteUser = (id) => {
  return db.none(`DELETE FROM users WHERE id=$1`, id)
    .catch((err) => {
      return err;
    });
};

const validateUser = (email) => {
  return db.oneOrNone(`SELECT * FROM users WHERE email=$1`,
    email)
    .catch((err) => {
      return err;
    });
};

const getUserProfileAndReviews = (id) => {
  return db.any(`
    SELECT users.name, users.image_url, users.current_city,
    reviews.title, reviews.content
    FROM users
    JOIN reviews
    ON users.id = reviews.user_id
    WHERE users.id=$1`, id)
    .catch((err) => {
      console.error(err);
      return err;
    });
};


module.exports = { createUser, deleteUser, getUserProfileAndReviews, validateUser };
