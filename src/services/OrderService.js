const { v4: uuidV4 } = require("uuid")
const { getTodaysDate } = require("../utils/getTodaysDate")
const { OrderRepository } = require("../repositories/OrderRepository")
const { CartService } = require("./CartService")
const { AddressService } = require("./AddressService")
const { EmailService } = require("./EmailService")

const orderRepository = new OrderRepository()

class OrderService {
    constructor() { }
    
    static async getAll() {
        return await orderRepository.getAll()
    }

    static async add(user) {
        const products = await CartService.getProducts(user.id)
        const cartId = await CartService.getId(user.id)
        await CartService.close(cartId)
        const order = { id: uuidV4(), cartId, order_date: getTodaysDate(), sent_date: 0}
        order.products = products
        await orderRepository.add(order)
        await this._sendReceipts(user, order)
        return order
    }
    static async getByUserId(userId) {
        const allOrders = await this.getAll()
        const cartIDs = await CartService.getAllIDsByUserId(userId)
        const userOrders = allOrders.filter(order => cartIDs.includes(order.cartId))
        const totalCostPerOrderArray = this._getArrayWithTotalCostPerOrder(userOrders)
        userOrders.map((order, index) => order.total = totalCostPerOrderArray[index])
        return userOrders
    }

    static async getById(id) {
        const allOrders = await this.getAll()
        return allOrders.find(order => order.id === id)
    }

    static async _sendReceipts(user, order) {
        const userAddress = await AddressService.getByUserId(user.id)
        const client = {...user, ...userAddress}
        EmailService.sendPurchaseReceipt(client, order)
        EmailService.sendSalesReceipt(client, order)
    }


    static _getArrayWithTotalCostPerOrder(ordersArray) {
        return ordersArray.map(item => {
        return item.products.map(product => product.price * product.quantity).reduce((total, value) => total + value, 0)
        })
    }
}

module.exports = { OrderService }