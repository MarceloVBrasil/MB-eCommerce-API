class OrderRepository {
    constructor() {
        this._orders = []
    }

    add(order) {
        this._orders.push(order)
        return order
    }

    getAll() {
        return this._orders
    }
}

module.exports = { OrderRepository }