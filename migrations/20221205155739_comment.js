const { v4: uuidV4 } = require("uuid")

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('comment', (table) => {
      table.uuid('id').primary().defaultTo(uuidV4()) // primary key
        table.string('message', 200).notNullable();
        table.bigInteger('timestamp').defaultTo(Date.now());
        table.string('user_id', 100)
            .notNullable()
            .references('id')
            .inTable('user')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.string('product_id', 100)
            .notNullable()
            .references('id')
            .inTable('product')
            .onDelete('CASCADE')
        .onUpdate('CASCADE')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('comment')
};
