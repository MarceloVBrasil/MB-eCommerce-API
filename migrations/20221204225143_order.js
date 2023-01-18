const { v4: uuidV4 } = require("uuid")

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('order', (table) => {
      table.uuid('id').primary().defaultTo(uuidV4()) // primary key
        table.bigInteger('order_date').notNullable().defaultTo(Date.now());
        table.bigInteger('order_sent');
        table.string('cart_id', 100)
            .notNullable()
            .unique()
            .references('id')
            .inTable('cart')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('order')
};
