
const { v4: uuidV4 } = require("uuid")
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.createTable('user', (table) => {
     table.uuid('id').primary().defaultTo(uuidV4()) // primary key
        table.string('name', 50).notNullable();
        table.string('password', 60).notNullable();
        table.string('email', 70).notNullable().unique();
        table.boolean('admin').notNullable().defaultTo(false);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
 return knex.schema.dropTable('user')
};
