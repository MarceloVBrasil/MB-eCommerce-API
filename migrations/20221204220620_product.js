/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('product', (table) => {
        table.increments('id'); // primary key
        table.string('name', 20).notNullable();
        table.string('description', 100).notNullable();
        table.float('price').unsigned().notNullable();
      table.integer('quantity').notNullable();
      table.string("image", 70).notNullable();
        table.integer('brand_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('brand')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.integer('category_id')
            .unsigned()
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
