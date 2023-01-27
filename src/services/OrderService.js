const { v4: uuidV4 } = require("uuid")
const { getTodaysDate } = require("../utils/getTodaysDate")
const { OrderRepository } = require("../repositories/OrderRepository")
const { CartService } = require("./CartService")
const { AddressService } = require("./AddressService")
const { EmailService } = require("./EmailService")
const { PurchaseRepository } = require("../repositories/PurchaseRepository")
const { ProductRepository } = require("../repositories/ProductRepository")

const orderRepository = new OrderRepository()
const purchaseRepository = new PurchaseRepository()
const productRepository = new ProductRepository()

class OrderService {
    constructor() {}

    static async add(user) {
        const cartId = await CartService.getId(user.id)
        await CartService.close(cartId)
        const order = { id: uuidV4(), cartId, order_date: getTodaysDate() }
        await orderRepository.add(order)
        await this._sendReceipts(user, order)
        return order
    }

    static async _sendReceipts(user, order) {
        const userAddress = await AddressService.getByUserId(user.id)
        const client = {...user, ...userAddress}
        const products = await this._getProductsByCartId(order.cartId)
        order.products = products
        EmailService.sendPurchaseReceipt(client, order)
        EmailService.sendSalesReceipt(client, order)
    }
    
    static async _getProductsByCartId(cartId) {
        const products = await purchaseRepository.getProductsByCartId(cartId)
        console.log(products)
        // get product name
        const namedProducts = products.map((product) => {
            const { name, price } = productRepository.getById(product.productId)
            return {...product, name, price}
        })

        return namedProducts
    }
}

module.exports = { OrderService }