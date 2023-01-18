const { v4: uuidV4 } = require("uuid")

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('product', (table) => {
      table.uuid('id').primary().defaultTo(uuidV4()) // primary key
        table.string('name', 20).notNullable();
        table.string('description', 100).notNullable();
        table.float('price').unsigned().notNullable();
      table.integer('quantity').notNullable();
      table.string("image", 70).notNullable();
        table.string('brand_id', 100)
            .notNullable()
            .references('id')
            .inTable('brand')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.string('category_id', 100)
            .notNullable()
            .references('id')
            .inTable('category')
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
  return knex.schema.dropTable('product')
};
