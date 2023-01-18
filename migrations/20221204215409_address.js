const { v4: uuidV4 } = require("uuid")

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.createTable('address', (table) => {
     table.uuid('id').primary().defaultTo(uuidV4()) // primary key
        table.string('street', 30).notNullable();
        table.string('city', 30).notNullable();
        table.string('complement', 20)
        table.string('postalCode', 7).notNullable();
        table.string('province', 2).notNullable();
        table.string('user_id', 100)
            .notNullable()
            .references('id')
            .inTable('user')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('address')
};
