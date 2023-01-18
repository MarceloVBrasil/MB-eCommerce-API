// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
// module.exports = {

//   client: 'mysql',
//   connection: {
//     host: "us-cdbr-east-06.cleardb.net",
//     user: "bc9c6ad1ff5ef3",
//     password: "2a835485",
//     database: "heroku_e146d2c81d5c302",
//     charset: "utf8"
//   }
// };

module.exports = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "capstone",
    charset: "utf8",
  },
};

