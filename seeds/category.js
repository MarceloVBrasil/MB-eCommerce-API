const { v4: uuidV4 } = require("uuid")

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const categories = [
  { id:'9d0b0267-a6c4-4411-aec7-551d1bb237ba', name: "Computers" },
  { id:'077e21e3-e37b-4353-bc8a-cedada17aea3', name: "Computers Accessories" },
  { id:'1567b4cf-fb56-445c-aa9a-47e6e1458860', name: "games"},
]

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category').del()
  await knex('category').insert(categories);
};
