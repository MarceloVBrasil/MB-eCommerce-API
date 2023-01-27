const { priceTag } = require("./priceTag")
function formatProductsData(products) {
    return products.map(product => {
        return {
            name: product.name,
            quantity: product.quantity,
            price: priceTag(product.price),
            totalPerProduct: priceTag(product.price * product.quantity)
        }
    })
}

module.exports = { formatProductsData }