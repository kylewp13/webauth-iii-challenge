const db = require('../data/dbConfig');

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db('users').select('user_id', 'username', 'password', 'department');
}

function findBy(user) {
  console.log(user)
  return db('users').where({ username: user });
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ user_id: id })
    .first();
}