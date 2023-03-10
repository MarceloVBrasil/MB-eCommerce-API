const knex = require("knex")(require("../knexfile"));
const stripe = require("stripe")("sk_test_51M3lWoBv6xxhS7gsfIUIgtVQf5to2Z1YHLbLH7RtoRnJgikAtapiqBwofni4UrZVF3XSDNqgvGfwgEnG0cbWReZu0002X32Wi8")
const cartController = require("./cartController")
const userController = require("./userController")
const { v4: uuidV4 } = require("uuid")

exports.puItemOnHold = async (req, res) => {
    try {
        const cartId = req.body.cartId
        const productId = req.params.productId
        if(!productId) return res.status(400).send("Invalid product id")
        if (!cartId) return res.status(400).send("Invalid cart id")

        const purchaseId = uuidV4()
        await knex('purchase').insert({ id: purchaseId, cart_id: cartId, product_id: productId })
        res.status(201).json(purchaseId)
    } catch (error) {
        res.status(503).send("Error storing item")
    }
}

exports.checkIfItemIsInCart = async (req, res) => {
    try {
        const { productId, cartId } = req.params;
        if(!productId) return res.status(400).send("Invalid product id")
        if (!cartId) return res.status(400).send("Invalid cart id")
        const data = await knex('purchase')
            .where("product_id", productId)
            .andWhere("cart_id", cartId)
            .first()
        
        res.json(data)
    } catch (error) {
        res.status(503).send("Error checking if item already exists in cart")
    }
}

exports.updatePurchaseQuantity = async (req, res) => {
    try {
        const { increment, cartId } = req.body
        const productId = req.params.productId
        if(!productId) return res.status(400).send("Invalid product id")
        if (!cartId) return res.status(400).send("Invalid cart id")
        if (increment !== true && increment !== false) return res.status(400).send("Invalid increment")
        
        let data;
        if (increment) {
            data = await knex("purchase")
            .where("cart_id", cartId)
            .andWhere("product_id", productId)
            .increment('quantity', 1)
        } else {
            data = await knex("purchase")
            .where("cart_id", cartId)
                .andWhere("product_id", productId)
                .andWhere("quantity", ">", 0)
            .decrement('quantity', 1)
        }
         
        res.json(data)
    } catch (error) {
        res.status(503).send("Error updating quantity")
    }
}

exports.getTotalQuantityInCart = async (req, res) => {
    try {
        const { cartId } = req.params;
        if (!cartId) return res.status(400).send("Invalid cart id")

        const total = await knex("purchase")
            .join("cart", "cart_id", "cart.id")
            .sum("quantity")
            .where("cart_id", cartId)
            .andWhere("cart.status", "open")
        .first()
        res.json(total["sum(`quantity`)"])
        
    } catch (error) {
        res.status(503).send("Error getting total quantity in cart")
    }
}

exports.getQuantityPerProduct = async (req, res) => {
    try {
        const { cartId } = req.params;
        if (!cartId) return res.status(400).send("Invalid cart id")

        const data = await knex("purchase")
            .join("cart", "cart_id", "cart.id")
            .select("product_id", "quantity")
            .where("cart_id", cartId)
        .andWhere("cart.status", "open")
        
        res.json(data)
        
    } catch (error) {
        res.status(503).send("Error getting quantity per product")
    }
}

exports.getQuantityByProductId = async (req, res) => {
    try {
        const { productId, cartId } = req.params;
        if(!productId) return res.status(400).send("Invalid product id")
        if (!cartId) return res.status(400).send("Invalid cart id")

        const data = await knex
            .select("quantity")
            .from("purchase")
            .where("product_id", productId)
            .andWhere("cart_id", cartId)
        .first()
        
        res.json(data)
        
    } catch (error) {
        res.status(503).send("Error getting quantity per product")
    }
}

exports.getTotalAmount = async (req, res) => {
    try {
        const { cartId } = req.params
        if (!cartId) return res.status(400).send("Invalid cart id")
        const data = await knex("purchase")
            .join("product", "product_id", "=", "product.id")
            .join("cart", "cart_id", "cart.id")
            .select("product.price", "purchase.quantity")
            .where("cart_id", cartId)
            .andWhere("cart.status", "open")
        
        const total = data.map(d => d.price * d.quantity).reduce((total, value) => total + value)
        
        res.json(total)
    } catch (error) {
        res.status(503).send("Error getting total amount")
    }
}

exports.processPayment = async (req, res) => {
    const { amount, name, userId } = req.body
    if(!userId) return res.status(400).send("Invalid user id")
    if (isNaN(amount) || amount <= 0) return res.status(400).send("Invalid amount")
    
    const index = req.rawHeaders.findIndex(key => key === 'Origin')
    const originURL = req.rawHeaders[index + 1]

      const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
              currency: "cad",
              product_data: {
                name
            },
            unit_amount: amount * 100,
        },
            quantity: 1, // 1 cart,
        },
    ],
    customer_email: await userController.getUserEmail(userId),
    mode: 'payment',
    success_url: `${originURL}?sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `${originURL}`,
      });

  res.json({url: session.url, id: session.id})
}

exports.getProductsWithQuantity = async (userId) => {
    if (!userId) return res.status(400).send("Invalid user id")
    const cartId = await cartController.getCartId(userId)
    try {
        const data = await knex("purchase")
            .join("cart", "cart_id", "cart.id")
            .join("product", "product_id", "product.id")
            .select("product.name", "purchase.quantity", "product.price")
            .where("cart_id", cartId.id)
            .andWhere("cart.status", "open")
            .andWhere("purchase.quantity", ">", "0")
        const dataWithTotalPerProduct = data.map(d => {
            return {...d, total: d.price * d.quantity}
        })
        return dataWithTotalPerProduct  
    } catch (error) {
       return error
    }
}