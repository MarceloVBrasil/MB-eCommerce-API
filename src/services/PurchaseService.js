const stripe = require("stripe")("sk_test_51M3lWoBv6xxhS7gsfIUIgtVQf5to2Z1YHLbLH7RtoRnJgikAtapiqBwofni4UrZVF3XSDNqgvGfwgEnG0cbWReZu0002X32Wi8")
const { UserService } = require("./UserService")

class PurchaseService {
    constructor() { }
    
    static async pay(userId, amount, originURL) {
        const user = await UserService.getById(userId)
        const session = await this.stripeCheckout(user, originURL, amount)
        return {url: session.url, id: session.id}
    }

    static async stripeCheckout(user, url, amountCents) {
        return await stripe.checkout.sessions.create({
            line_items: [
              {
                price_data: {
                      currency: "cad",
                      product_data: {
                        name: user.name                                                              
                    },
                    unit_amount: amountCents * 100,                                            
                },
                    quantity: 1, // 1 cart,
                },
            ],
            customer_email: user.email,                    
            mode: 'payment',
            success_url: `${url}?sessionId={CHECKOUT_SESSION_ID}`,                 
            cancel_url: `${url}`,
        });
    }
}

module.exports = { PurchaseService }