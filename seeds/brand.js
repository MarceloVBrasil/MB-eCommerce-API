/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const brands = [
  { name: "Apple" },
  { name: "Dell" },
  { name: "Samsung" },
  { name: "Logitech" },
  { name: "Brocs" },
  { name: "Sony" },
  { name: "Corsair" },
  { name: "Snowkids" },
  {name: "Acer"}
  
]

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('brand').del()
  await knex('brand').insert(brands);
};
