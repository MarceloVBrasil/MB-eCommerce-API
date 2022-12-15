

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('purchase', (table) => {
        table.increments('id'); // primary key
        table.integer('quantity').notNullable().defaultTo(1)
        table.integer('product_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('product')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.integer('cart_id')
            .unsigned()
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

