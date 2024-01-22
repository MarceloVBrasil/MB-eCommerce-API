require("dotenv").config()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { UserService } = require("../services/UserService");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).send("Error: Fill in required fields")

    const user = await UserService.getByEmail(email)

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({
        email: user.email,
      }, process.env.SECRET_KEY,
        { expiresIn: "24h" })

      delete user.password

      return res.status(200).json({ ...user, token })
    }
    res.status(401).send("Wrong credentials")

  } catch (error) {
    res.status(503).send("Error logging in user");
  }
}