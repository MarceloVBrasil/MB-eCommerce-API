

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { v4: uuidV4 } = require("uuid")

exports.up = function (knex) {
    return knex.schema.createTable('purchase', (table) => {
        table.uuid('id').primary().defaultTo(uuidV4()) // primary key
        table.integer('quantity').notNullable().defaultTo(1)
        table.string('product_id', 100)
            .notNullable()
            .references('id')
            .inTable('product')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.string('cart_id',100)
            .notNullable()
            .references('id')
            .inTable('cart')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.check('?? >= 0', 'quantity')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
 return knex.schema.dropTable('purchase')
};

