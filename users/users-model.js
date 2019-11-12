const db = require("../data/db-config.js");

module.exports = {
  find,
  findBy,
  findById,
  add
};

function find() {
  return db("users");
}

function findBy(user) {
  return db("users").where({username: user}).first();
}

function findById(id) {
    return db("users")
      .where({ id })
      .first();
  }

function add(user) {
  return db("users").insert(user);
}