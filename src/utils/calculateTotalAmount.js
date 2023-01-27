function calculateTotal(products) {
    return products.reduce((total, product) => total + product.price * product.quantity, 0)
}

module.exports = { calculateTotal }