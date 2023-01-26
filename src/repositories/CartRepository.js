class CartRepository {
    constructor() { 
        this._carts = [
            {id: '58b1df5f-48bf-4004-8abf-6fc16bb9d798', userId: '11c6dbf0-b2db-4520-b306-ed7f1534e49b', status: 'open'}
        ]
    }

   async getId(userId) {
        return this._carts.find(cart => cart.userId === userId && cart.status === 'open')?.id
    }
    
    async open(cart) {
        const openedCart = { id: cart.cartId, status: 'open', userId: cart.userId }
        this._carts.push(openedCart)
        return cart
    }
    
    async close(id) {
        const openedCartIndex = this._carts.find(cart => cart.id === id)
        this._carts[openedCartIndex] = { ...this._carts[openedCartIndex], status: 'close' }
        return id
    }

    async isOpen(userId) {
        const cart = this._carts.find(cart => cart.userId === userId)
        return cart.status === 'open'
    }
}

module.exports = { CartRepository }