require("dotenv").config()
const jwt = require("jsonwebtoken")

class AuthenticationService {
    constructor() { }
    
    static signJWT(email) {
        const payload = { email }
        const secretKey = process.env.SECRET_KEY
        const options = {expiresIn: "24h"}
        return jwt.sign(payload, secretKey, options)
    }
}

module.exports = { AuthenticationService }