const knex = require("knex")(require("../knexfile"));
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

exports.puItemOnHold = async (req, res) => {
    try {
        const cartId = req.body.cartId
        const productId = req.params.productId
        const data = await knex('purchase').insert({ cart_id: cartId, product_id: productId })
        res.status(201).json(data[0])
    } catch (error) {
        res.status(503).send("Error storing item")
    }
}

exports.checkIfItemIsInCart = async (req, res) => {
    try {
        const { productId, cartId } = req.params;
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
        const {cartId} = req.params
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
    customer_email: await getUserEmail(userId),
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}?sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}`,
  });

  res.json({url: session.url, id: session.id})
}

async function getUserEmail(id) {
    try {
        const data = await knex
            .select("email")
            .from("user")
            .where("id", id)
            .first()
        return data.email
    } catch (error) {
       return error
    }
}