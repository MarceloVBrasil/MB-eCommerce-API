const knex = require("knex")(require("../knexfile"));
const stripe = require("stripe")("sk_test_51M3lWoBv6xxhS7gsfIUIgtVQf5to2Z1YHLbLH7RtoRnJgikAtapiqBwofni4UrZVF3XSDNqgvGfwgEnG0cbWReZu0002X32Wi8")
const { generateSalesReceipt, generatePurchaseReceipt } = require("../pdf")
const { getTodaysDate } = require("../utils/getTodaysDate")
const { sendOrderEmail } = require("../mailer")

const userController = require("./userController")
const cartController = require("./cartController")
const purchaseController = require("./purchaseController")

exports.paymentSuccessful = async (req, res) => {
    try {
        const { customer_details: { email }, } = await stripe.checkout.sessions.retrieve(req.query.sessionId);
        const userId = await userController.getUserId(email)
        if (!userId) return res.status(400).send("Email Invalid")
        if (userId.id !== parseInt(req.query.userId)) return res.status(400).send("Email invalid")
        
        const products = await purchaseController.getProductsWithQuantity(userId.id)
        const cartId = await cartController.getCartId(userId)
        await cartController.closeCart(cartId)
        await createNewPaymentOrder(cartId)
        const orderId = await getOrderId(cartId)

        const client = await userController.getUserContactInfo(userId)
        const order = { orderId, date: getTodaysDate(), products }
        if (Array.isArray(products)) {
            generateSalesReceipt(client, order)
            generatePurchaseReceipt(client, order)
       }

        res.send("payment made successfully!")
    }
    catch (error) {
        res.status(503).send("Error processing order. " + error)
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

exports.getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params
        if (!userId) return res.status(400).send("Cannot get orders: Invalid user id")
        const data = await knex('purchase')
            .join('cart', 'cart_id', 'cart.id')
            .join('product', 'product_id', 'product.id')
            .join('order', 'cart.id', 'order.cart_id')
            .select('product.price', 'purchase.quantity', 'order.id', 'order.order_date', 'order.order_sent')
            .where("cart.status", "closed")
            .andWhere("cart.user_id", userId)
            .orderBy("order.order_date", "desc")
        
        const dataWIthTotalPerProduct = data.map(d => {
            return { total: d.price * d.quantity, orderId: d.id, orderDate: d.order_date, orderSent: d.order_sent !== null }
        })
        const dataWithTotalPerOrder = groupArrayOfObjectsById(dataWIthTotalPerProduct)
        res.json(dataWithTotalPerOrder)
    } catch (error) {
        res.status(503).send("Error getting user orders")
    }
}

exports.getQuantityOfUndeliveredOrders = async(req, res) => {
    try {
        const { admin } = req.params
        if (admin === '1') {
            const data = await knex.count('id as undeliveredOrders').from('order').whereNull("order_sent").first()
        res.json(data.undeliveredOrders)
        } else {
            res.status(403).send("You do not have access to this method")
        }
        
    } catch (error) {
        res.status(503).send("Error getting total quantity of orders")
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const { admin } = req.params
        if (admin === '1') {
                    const data = await knex('purchase')
            .join('cart', 'cart_id', 'cart.id')
            .join('product', 'product_id', 'product.id')
            .join('order', 'cart.id', 'order.cart_id')
            .select('product.price', 'purchase.quantity', 'order.id', 'order.order_date', 'order.order_sent')
            .where("cart.status", "closed")
            .orderBy("order.order_date", "desc")
        
            const dataWIthTotalPerProduct = data.map(d => {
                return { total: d.price * d.quantity, orderId: d.id, orderDate: d.order_date, orderSent: d.order_sent !== null }
            })
            const dataWithTotalPerOrder = groupArrayOfObjectsById(dataWIthTotalPerProduct)
            res.json(dataWithTotalPerOrder)
        } else {
            res.status(403).send("You do not have access to this method")
        }

    } catch (error) {
        res.status(503).send("Error getting user orders")
    }
}

exports.sendOrder = async (req, res) => {
    try {
        const { orderId, userId } = req.body
        const user = await userController.getUserContactInfo(userId)
        const data = await knex("order")
            .where("id", orderId)
            .update({ order_sent: Date.now() })
        sendOrderEmail(orderId, user.name, user.email)
        res.json(data)
        
    } catch (error) {
        console.log(error)
        res.status(503).send("Error sending products")
    }
}

function groupArrayOfObjectsById(array) {
    const keys = []
    return array.map(element => {
        if (!keys.includes(element.orderId)) {
            keys.push(element.orderId)
            return {
                orderId: element.orderId,
                orderDate: element.orderDate,
                orderSent: element.orderSent,
                total: array.reduce((total, current) => {
                    if (current.orderId === element.orderId) return total + current.total
                    return total
                }, 0)
            };
        }
    }).filter(element => element !== undefined);
}