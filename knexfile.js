// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  client: 'mysql',
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "capstone",
    charset: "utf8"
  }
};
