    function priceTag(price) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })
    return formatter.format(price)
}

module.exports = { priceTag }