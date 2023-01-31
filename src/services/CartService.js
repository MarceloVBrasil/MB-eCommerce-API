const { v4: uuidV4 } = require("uuid")
const { CartRepository } = require("../repositories/CartRepository");
const { PurchaseRepository } = require("../repositories/PurchaseRepository");
const { ProductRepository } = require("../repositories/ProductRepository");
const cartRepository = new CartRepository()
const purchaseRepository = new PurchaseRepository()
const productRepository = new ProductRepository()

class CartService {
    constructor() { }
    
    static async getProducts(userId) {
        // get cartId
        const cartId = await cartRepository.getId(userId)
        // filter purchaseRepository by cartId searching for productId and its quantity
        const products = await purchaseRepository.getProductsByCartId(cartId)
        // get product name
        const namedProducts = products.map((product) => {
            const { name, price } = productRepository.getById(product.productId)
            return {...product, name, price}
        })

        return namedProducts
    }

    static async add(userId, productId) {
        // get cart id
        let cartId = await cartRepository.getId(userId)
        // check if cart is open
        const isCartOpen = await cartRepository.isOpen(userId)
        // if not, open cart and add product
        if (!isCartOpen) cartId = await this.open(userId)
        // check if cart has product
        const hasProduct = await this.hasProduct(cartId, productId)
        if (hasProduct) return this.update(userId, { productId, increasedBy: 1 })
        // else, add product
        const purchaseData = { id: uuidV4(), cartId, productId }
        const product = await purchaseRepository.addToCart(purchaseData)
        const productPrice = await productRepository.getById(productId).price
        return {...product, price: productPrice}
    }
    
    static async open(userId) {
        // add cartId to cart
        const cart = {}
        cart.userId = userId
        cart.id = uuidV4()
        // open cart
       return await cartRepository.open(cart)
    }

    static async update(userId, data) {
        // get cart id
        const cartId = await cartRepository.getId(userId)
        // check for edge cases (quantity = 0)
        const hasProduct = await this.hasProduct(cartId, data.productId)
        if (data.increasedBy === 1 || hasProduct) {
            // update cart
            const product = await purchaseRepository.updateCart(cartId, data)
            const productPrice = await productRepository.getById(data.productId).price
            return { ...product, price: productPrice }
        }
        return { message: "cannot remove inexistent product in cart" }  
    }
       
    
    static async isOpen(userId) {
        return cartRepository.isOpen(userId)
    }

    static async hasProduct(cartId, productId) {
        // check with purchase Repository if cart has product
        const cart = await purchaseRepository.getProductsByCartId(cartId)
        const product = cart.find(item => item.productId === productId)
        return !!product && product.quantity > 0
    }
    
    static async getId(userId) {
        return cartRepository.getId(userId)
    }
    static async close(id) {
        return await cartRepository.close(id)
    }

    static async getAllIDsByUserId(userId) {
        return await cartRepository.getAllIDsByUserId(userId)
    }
}

module.exports = { CartService }