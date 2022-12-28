const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const { validateEmail, validatePostalCode } = require("../validate");

exports.updateUser = async (req, res) => {
    try {
        const { name, password, email, street, city, province, complement, postalCode } = req.body
        const { userId } = req.params
        if(!validateEmail(email)) res.status(400).send("Error: Please enter a valid email")
        if (!validatePostalCode(postalCode)) res.status(400).send("Error: Please enter a valid postal code")
        
        const userEmail = await getUserEmail(userId)
        const emailExists = await checkIfEmailExists(email)
        if (!name || !password || !email || !street || !city || !province || !postalCode)
            return res.status(400).send("Please fill in required fields")
        if (emailExists && userEmail !== email) return res.status(400).send("Error: Email already taken")
        await knex("user")
            .where({ id: userId })
            .update({ name, password: bcrypt.hashSync(password), email })
        await knex("address")
            .where({ user_id: userId })
            .update({ street, city, province, complement, postalCode })
        res.json({id: userId, ...req.body})

    } catch (error) {
        res.status(503).send("Error updating user")
    }
}

exports.getUserContactInfo = async (id) => {
    try {
        const userId = id.id ? id.id : id;
        const data = knex("address")
            .join("user", "address.user_id", "user.id")
            .select("user.name", "user.email", "address.complement", "address.city",
                "address.postalCode", "address.province", "address.street")
            .where("user.id", userId)
        .first()
        return data
    } catch (error) {
        return error
    }
}

async function checkIfEmailExists(email) {
    const data = await knex
    .select("email")
    .from("user")
        .where("email", email)
        .first()
    return data
}

async function getUserEmail(id) {
    const data = await knex
        .select("email")
        .from("user")
        .where("id", id)
        .first()
    return data.email
}