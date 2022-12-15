const knex = require("knex")(require("../knexfile"));
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const { sendReceipt } = require("../mailer");

exports.paymentSuccessful = async (req, res) => {
    try {
        const { customer_details: { email }, } = await stripe.checkout.sessions.retrieve(req.query.sessionId);
        const userId = await getUserId(email)
        if (!userId) return res.status(400).send("Email Invalid")
        if (userId.id !== parseInt(req.query.userId)) return res.status(400).send("Email invalid")
        const products = await getProductsWithQuantity(userId.id)
        const cartId = await getCartId(userId)
        await closeCart(userId)
        await createNewPaymentOrder(cartId)
        const orderId = await getOrderId(cartId)
        const userName = await getUserName(userId)

       if(Array.isArray(products)) await sendReceipt(email, products, orderId, getTodaysDate(), getFutureDate(15), userName)

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

async function closeCart(userId) {
    try {
        const data = await knex('cart')
            .where("id", userId)
            .update({ status: "closed" })
        return data
    } catch (error) {
        return error
    }
}

async function createNewPaymentOrder(cartId) {
    try {
        await knex('order')
            .insert({ order_date: Date.now(), cart_id: cartId.id })
        
    } catch (error) {
        return error
    }
}

async function getProductsWithQuantity(userId) {
    const cartId = await getCartId(userId)
    try {
        const data = await knex("purchase")
            .join("cart", "cart_id", "cart.id")
            .join("product", "product_id", "product.id")
            .select("product.name", "purchase.quantity", "product.price")
            .where("cart_id", cartId.id)
            .andWhere("cart.status", "open")        
        return data        
    } catch (error) {
       return error
    }
}

async function getCartId(userId) {
    try {
        const id = userId.id ? userId.id : userId
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
    try {
        const data = await knex
            .select("name")
            .from("user")
            .where("id", id)
            .first()
        return data.name
    } catch (error) {
        return error
    }
}

function makeNumberTwoDigits(number) {
    return number < 10 ? `0` + number : number;
}

function getTodaysDate() {
    const date = new Date(Date.now())
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

function getFutureDate(daysInTheFuture) {
  const futureDate = new Date(getTodaysDate());
    futureDate.setDate(futureDate.getDate() + daysInTheFuture + 1);
    const futureYear = futureDate.getFullYear()
    const futureMonth = makeNumberTwoDigits(futureDate.getMonth() + 1)
    const futureDay = makeNumberTwoDigits(futureDate.getDate())
  return `${futureYear}-${futureMonth}-${futureDay}`;
}