const knex = require("knex")(require("../knexfile"));
const { v4: uuidV4 } = require("uuid")

exports.createNewCart = async (req, res) => {
    try {
        const userId = req.body.userId
        const cartId = uuidV4()
        await knex('cart').insert({ id: cartId, user_id: userId })
        res.status(201).json(cartId)
    } catch (error) {
        res.status(503).send("Error creating new Cart")
    }
}

exports.checkIfCartIsOpen = async (req, res) => {
    try {
        const userId = req.params.userId
        if(!userId) return res.status(400).send("Invalid user id")
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
            .select("product.name", "purchase.quantity", "order.id")
            .where("order.id", orderId)
            .andWhere("cart.user_id", userId)
        res.json(data)
    } catch (error) {
        res.status(503).send("Error getting products in cart")
    }
}

exports.closeCart = async (cartId) => {
    const id = cartId.id ? cartId.id : cartId
    if (!cartId) return res.status(400).send("Invalid cart id")
    try {
        const data = await knex('cart')
            .where({ id: id })
            .update({ status: "closed" })
        return data
    } catch (error) {
        return error
    }
}

exports.getCartId = async (userId) => {
    const id = userId.id ? userId.id : userId
    if (!id) return res.status(400).send("Invalid user id")
    try {
        const data = await knex
            .select("id")
            .from("cart")
            .where("user_id", id)
            .andWhere("status", "open")
            .first()
        return data
    } catch (error) {
        return error
    }
}