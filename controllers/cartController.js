const knex = require("knex")(require("../knexfile"));

exports.createNewCart = async (req, res) => {
    try {
        const userId = req.body.userId
        const data = await knex('cart').insert({ user_id: userId })
        res.status(201).json(data[0])
    } catch (error) {
        res.status(503).send("Error creating new Cart")
    }
}

exports.checkIfCartIsOpen = async (req, res) => {
    try {
        const userId = req.params.userId
        const data = await knex
            .select("id")
            .from("cart")
            .where("user_id", userId)
            .andWhere("status", "open").first()
        res.json(data)
    } catch (error) {
        res.status(503).send("Error checking for open cart")
    }
}