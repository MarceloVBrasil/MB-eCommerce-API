function calculateTotal(products) {
    return products.reduce((total, product) => total + product.total, 0)
}

module.exports = { calculateTotal }