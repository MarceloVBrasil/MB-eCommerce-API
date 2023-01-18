const { v4: uuidV4 } = require("uuid")

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return  knex.schema.createTable('brand', (table) => {
    table.uuid('id').primary().defaultTo(uuidV4()) // primary key
        table.string('name', 30).notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
 return knex.schema.dropTable('brand')
};
