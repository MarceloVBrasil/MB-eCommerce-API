const knex = require("knex")(require("../knexfile"));
const stripe = require("stripe")("sk_test_51M3lWoBv6xxhS7gsfIUIgtVQf5to2Z1YHLbLH7RtoRnJgikAtapiqBwofni4UrZVF3XSDNqgvGfwgEnG0cbWReZu0002X32Wi8")
const { sendReceipt } = require("../mailer");

exports.paymentSuccessful = async (req, res) => {
    try {
        const { customer_details: { email }, } = await stripe.checkout.sessions.retrieve(req.query.sessionId);
        const userId = await getUserId(email)
        if (!userId) return res.status(400).send("Email Invalid")
        if (userId.id !== parseInt(req.query.userId)) return res.status(400).send("Email invalid")
        const products = await getProductsWithQuantity(userId.id)
        const cartId = await getCartId(userId)
        await closeCart(cartId)
        await createNewPaymentOrder(cartId)
        const orderId = await getOrderId(cartId)
        const userName = await getUserName(userId)

       if(Array.isArray(products)) await sendReceipt(email, products, orderId, getTodaysDate(), getTodaysDate(), userName)

        res.send("payment made successfully!")
    }
    catch (error) {
        res.status(503).send("Error processing order. " + error)
    }
}

async function getUserId(email) {
    try {
        const data = await knex
            .select("id")
            .from("user")
            .where("email", email)
            .first()
        return data
    } catch (error) {
        return error
    }
}

async function closeCart(cartId) {
    const id = cartId.id ? cartId.id : cartId
    if (isNaN(id) || id <= 0) return res.status(400).send("Invalid cart id")
    try {
        const data = await knex('cart')
            .where({ id: id })
            .update({ status: "closed" })
        return data
    } catch (error) {
        return error
    }
}

async function createNewPaymentOrder(cartId) {
    if (isNaN(cartId.id) || cartId.id <= 0) return res.status(400).send("Invalid cart id")
    try {
        await knex('order')
            .insert({ order_date: Date.now(), cart_id: cartId.id })
        
    } catch (error) {
        return error
    }
}

async function getProductsWithQuantity(userId) {
    if (isNaN(userId) || userId <= 0) return res.status(400).send("Invalid user id")
    const cartId = await getCartId(userId)
    try {
        const data = await knex("purchase")
            .join("cart", "cart_id", "cart.id")
            .join("product", "product_id", "product.id")
            .select("product.name", "purchase.quantity", "product.price")
            .where("cart_id", cartId.id)
            .andWhere("cart.status", "open")
            .andWhere("purchase.quantity", ">", "0")
        return data        
    } catch (error) {
       return error
    }
}

async function getCartId(userId) {
    const id = userId.id ? userId.id : userId
    if (isNaN(id) || id <= 0) return res.status(400).send("Invalid user id")
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

async function getOrderId(cartId) {
    if (isNaN(cartId.id) || cartId.id <= 0) return res.status(400).send("Invalid cart id")
    try {
        const data = await knex
            .select("id")
            .from("order")
            .where("cart_id", cartId.id)
            .first()
        return data.id
    } catch (error) {
        return error
    }
}

async function getUserName(id) {
    const userId = id.id ? id.id : id
    if (isNaN(userId) || userId <= 0) return res.status(400).send("Invalid user id")
    try {
        const data = await knex
            .select("name")
            .from("user")
            .where("id", userId)
            .first()
        return data.name
    } catch (error) {
        return error
    }
}

function getTodaysDate() {
    const date = new Date(Date.now())
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}