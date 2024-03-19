const stripe = require("stripe")("sk_test_51M3lWoBv6xxhS7gsfIUIgtVQf5to2Z1YHLbLH7RtoRnJgikAtapiqBwofni4UrZVF3XSDNqgvGfwgEnG0cbWReZu0002X32Wi8")

import { IProductInCart } from "../models/ProductInCart"
import { IProductsInCartrepository } from "../repositories/interfaces/IProductsInCartRepository"
import { ProductFactory } from "./factories/ProductFactory"
import { UserFactory } from "./factories/UserFactory"
import { decreaseProductQuantityByOne } from "./helpers/ProductHelper"


export class ProductsInCartService {
    constructor(private productsInCartRepository: IProductsInCartrepository) { }

    async pay(userId: string, amount: number, originURL: string) {
        const userService = UserFactory()

        const user = await userService.getById(userId)
        const session = await this.stripeCheckout(user, originURL, amount)
        return { url: session.url, id: session.id }
    }

    async stripeCheckout(user: any, url: string, amountCents: number) {
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

    async getByCartId(cartId: string) {
        return await this.productsInCartRepository.getByCartId(cartId)
    }

    async add(data: IProductInCart) {
        const productService = ProductFactory()

        const doesProductExist = await productService.getById(data.productId)
        if (!doesProductExist) throw new Error('Product does not exist')

        const isProductAvailable = doesProductExist.quantity > 0
        if (!isProductAvailable) throw new Error('Product unavailable')

        await decreaseProductQuantityByOne(doesProductExist)

        return await this.productsInCartRepository.add(data)
    }

    async delete(cartId: string, productId: string) {
        return await this.productsInCartRepository.delete(cartId, productId)
    }
}
