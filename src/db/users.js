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

const editUserProfile = (id, name, currentcity, imageUrl) => {
  return db.one(`
    UPDATE users
    SET name=$2, current_city=$3, image_url=$4
    WHERE id=$1
    `, [id, name, currentcity, imageUrl]);
};


module.exports = { createUser, deleteUser, editUserProfile, getUserProfileAndReviews, validateUser };
