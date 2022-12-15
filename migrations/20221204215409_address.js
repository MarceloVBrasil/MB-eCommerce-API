/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.createTable('address', (table) => {
        table.increments('id'); // primary key
        table.string('street', 30).notNullable();
        table.string('city', 30).notNullable();
        table.string('complement', 20)
        table.string('postalCode', 7).notNullable();
        table.string('province', 2).notNullable();
        table.integer('user_id')
            .unsigned()
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
