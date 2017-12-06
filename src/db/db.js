const pgp = require('pg-promise')();

const db = pgp(process.env.DATABASE_URL || "postgres://localhost:5432/roam");

// const db = pgp({
//   host: "localhost",
//   port: 5432,
//   database: "roam",
// });

module.exports = db;
