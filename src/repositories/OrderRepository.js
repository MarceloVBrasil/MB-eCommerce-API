class OrderRepository {
    constructor() {
        this._orders = []
    }

    add(order) {
        this._orders.push(order)
        return order
    }
}

module.exports = { OrderRepository }