/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('order', (table) => {
      table.increments('id') // primary key
        .unsigned();
        table.bigInteger('order_date').notNullable().defaultTo(Date.now());
        table.bigInteger('order_sent');
        table.integer('cart_id')
            .unsigned()
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
