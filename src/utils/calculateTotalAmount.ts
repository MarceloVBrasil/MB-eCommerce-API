function calculateTotal(products: any) {
    return products.reduce((total: number, product: any) => total + product.price * product.quantity, 0)
}

export { calculateTotal }