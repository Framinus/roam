const db = require('./db.js');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const createUser = (name, email, password) => {
  return db.oneOrNone(`
    INSERT INTO users (name, email, password)
    VALUES (lower($1::text), lower($2::text), $3)
    RETURNING *`, [name, email, password])
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

const getUserProfile = (id) => {
  return db.one(`SELECT * FROM users WHERE id=$1`, id)
    .catch((err) => {
      return err;
    })
};

module.exports = { createUser, deleteUser, getUserProfile, validateUser };
