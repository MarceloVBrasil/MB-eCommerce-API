/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const bcrypt = require('bcryptjs')

const users = [
  {
    name: 'Marcelo',
    password: bcrypt.hashSync('123'),
    email: 'marcelo.vital.brasil@gmail.com'
  }
]

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert(users);
};
