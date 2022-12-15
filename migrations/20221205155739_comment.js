/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('comment', (table) => {
        table.increments('id'); // primary key
        table.string('message', 200).notNullable();
        table.bigInteger('timestamp').defaultTo(Date.now());
        table.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('user')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.integer('product_id')
            .unsigned()
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
