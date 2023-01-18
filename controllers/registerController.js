const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const { v4: uuidV4 } = require("uuid")
const { validateEmail, validatePostalCode } = require("../validate");

exports.registerNewUser = async (req, res) => {
  try {
      const { name, password, email, street, city, province, postalCode, complement } = req.body
    if (!name || !password || !email || !street || !city || !province || !postalCode) return res.status(400).send("Error: Fill in required fields")
    if(!validateEmail(email)) return res.status(400).send("Error: Please enter a valid email")
    if (!validatePostalCode(postalCode)) return res.status(400).send("Error: Please enter a valid postal code")

    const userId = uuidV4()
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    
    const newUser = { capitalizedName, password: bcrypt.hashSync(password), email }
    newUser.id = userId

    await knex("user").insert(newUser)

    const newUserAddress = { street, city, province, complement, postalCode, user_id: userId }
    newUserAddress.id = uuidV4()
      await knex("address").insert(newUserAddress)
      res.status(201).json([newUser, newUserAddress])
      
  } catch (error) {
    console.log(error)
    res.status(503).send("Error registering new user");
  }
};
