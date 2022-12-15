/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const categories = [
  { name: "Computers" },
  { name: "Computers Accessories" },
  {name: "games"},
]

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category').del()
  await knex('category').insert(categories);
};
