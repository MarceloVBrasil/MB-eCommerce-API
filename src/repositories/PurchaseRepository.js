class PurchaseRepository {
    constructor() {
        this._purchases = [
            {id: '8321ce9f-01cc-4c9e-940e-ae9216e4477a', productId: 'f41e4377-d911-4c8a-8c04-54a948357417', quantity: 1, cartId: '58b1df5f-48bf-4004-8abf-6fc16bb9d798'}
        ]
    }

   async getProductsByCartId(cartId) {
        return this._purchases.filter(purchase => purchase.cartId === cartId)
    }

    async addToCart(data) {
        const { id, cartId, productId } = data
        const product = { id, cartId, productId, quantity: 1 }
        this._purchases.push(product)
        return product
    }

    async updateCart(cartId, data) {
        const { productId, increasedBy } = data
        const productIndex = this._purchases.findIndex(purchase => purchase.cartId === cartId && purchase.productId === productId)
        const updatedProduct = this._purchases[productIndex]
        updatedProduct.quantity += increasedBy
        this._purchases[productIndex] = updatedProduct
        return updatedProduct
    }
}

module.exports = { PurchaseRepository }