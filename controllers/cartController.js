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
        if(isNaN(userId) || userId <= 0) return res.status(400).send("Invalid user id")
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

exports.getProductsInCart = async (req, res) => {
    try {
        const { userId, orderId } = req.params
        if (!userId || !orderId) return res.status(400).send("Invalid userId or orderId")
        const data = await knex("purchase")
            .join("product", "purchase.product_id", "product.id")
            .join("order", "purchase.cart_id", "order.cart_id")
            .join("cart", "purchase.cart_id", "cart.id")
            .select("product.name", "purchase.quantity", "product.image")
            .where("order.id", orderId)
            .andWhere("cart.user_id", userId)
        res.send(data)
    } catch (error) {
        res.status(503).send("Error getting products in cart")
    }
}