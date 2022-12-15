const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs")

exports.registerNewUser = async (req, res) => {
  try {
      const { name, password, email, street, city, province, postalCode, complement } = req.body
    if (!name || !password || !email || !street || !city || !province || !postalCode) return res.status(400).send("Error: Fill in required fields")

    const newUser = { name, password: bcrypt.hashSync(password), email }

    const insertedUser = await knex("user").insert(newUser)
    const newUserAddress = { street, city, province, complement, postalCode, user_id: insertedUser[0] }

      await knex("address").insert(newUserAddress)
      res.status(201).json([newUser, newUserAddress])
      
  } catch (error) {
    res.status(503).send("Error registering new user");
  }
};
