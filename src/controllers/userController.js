const knex = require("knex")(require("../../knexfile"));
const bcrypt = require("bcryptjs");
const { validateEmail, validatePostalCode } = require("../utils/validate");
const { UserSchema } = require("./schemas/UserSchema");
const { UserService } = require("../services/UserService");
const { v4: uuidV4 } = require("uuid");

// exports.getUserEmail = async (id) =>  {
//     const data = await knex
//         .select("email")
//         .from("user")
//         .where("id", id)
//         .first()
//     return data.email
// }

// exports.updateUser = async (req, res) => {
//     try {
//         const { name, password, email, street, city, province, complement, postalCode } = req.body
//         const { userId } = req.params
//         if(!validateEmail(email)) res.status(400).send("Error: Please enter a valid email")
//         if (!validatePostalCode(postalCode)) res.status(400).send("Error: Please enter a valid postal code")

//         const userEmail = await getUserEmail(userId)
//         const emailExists = await checkIfEmailExists(email)
//         if (!name || !password || !email || !street || !city || !province || !postalCode)
//             return res.status(400).send("Please fill in required fields")
//         if (emailExists && userEmail !== email) return res.status(400).send("Error: Email already taken")
//         await knex("user")
//             .where({ id: userId })
//             .update({ name, password: bcrypt.hashSync(password), email })
//         await knex("address")
//             .where({ user_id: userId })
//             .update({ street, city, province, complement, postalCode })
//         res.json({id: userId, ...req.body})

//     } catch (error) {
//         res.status(503).send("Error updating user")
//     }
// }

// exports.getUserContactInfo = async (id) => {
//     try {
//         const userId = id.id ? id.id : id;
//         const data = knex("address")
//             .join("user", "address.user_id", "user.id")
//             .select("user.name", "user.email", "address.complement", "address.city",
//                 "address.postalCode", "address.province", "address.street")
//             .where("user.id", userId)
//         .first()
//         return data
//     } catch (error) {
//         return error
//     }
// }

// exports.getUserId = async (email) => {
//     try {
//         const data = await knex
//             .select("id")
//             .from("user")
//             .where("email", email)
//             .first()
//         return data
//     } catch (error) {
//         return error
//     }
// }

// async function checkIfEmailExists(email) {
//     const data = await knex
//     .select("email")
//     .from("user")
//         .where("email", email)
//         .first()
//     return data
// }

// async function getUserEmail(id) {
//     const data = await knex
//         .select("email")
//         .from("user")
//         .where("id", id)
//         .first()
//     return data.email
// }

class UserController {
    constructor() { }

    // getUserEmail -> X -- OK
    // getUserContactInfo -> getById -- OK
    static async getById(req, res) {
        try {
            await UserSchema.getById().validate(req.params)
            const result = await UserService.getById(req.params.id)
            if (!Object.keys(result).length) return res.status(400).json({ message: "user not found" })
            res.json(result)

        } catch (error) {
            res.status(503).json({ message: error.message })
        }
    }
    // getUserId -> getByEmail -- OK
    static async getByEmail(email) {
        try {
            await UserSchema.getByEmail().validate({ email })
            const result = await UserService.getByEmail(email)
            return result
        } catch (error) {
            return error
        }
    }
    // from register controller -> add -- OK
    static async add(req, res) {
        try {
            await UserSchema.add().validate(req.body)
            req.body.userId = uuidV4()
            req.body.addressId = uuidV4()
            const result = await UserService.add(req.body)
            if (!Object.keys(result).length) return res.status(400).json({ message: "email already registered" })
            res.json(result)
        } catch (error) {
            res.status(503).json({ message: error.message })
        }
    }
    // checkIfEmailExists -> move to user service as checkExistence -- OK
    // updateUser -> update -- OK
    static async update(req, res) {
        try {
            await UserSchema.update().validate({ ...req.params, ...req.body })
            const result = await UserService.update(req.params.id, req.body)
            if (!Object.keys(result).length) return res.status(400).json({ message: "email already registered" })
            res.json(result)

        } catch (error) {
            res.status(503).json({ message: error.message })
        }
    }
    // new function -> delete
    static async delete(req, res) {
        try {

            await UserSchema.delete().validate(req.params)
            const userResult = await UserService.delete(req.params.id)
            res.json(userResult)
        } catch (error) {
            res.status(503).json({ message: error.message })
        }
    }
    // from login controller -> login
    static async login(req, res) {
        try {
            await UserSchema.login().validate(req.body)
            const result = await UserService.login(req.body)
            if (!Object.keys(result).length) res.status(400).json({ message: "wrong credentials" })
            else res.json(result)
        } catch (error) {
            res.status(503).json({ message: error.message })
        }
    }
}

module.exports = { UserController }