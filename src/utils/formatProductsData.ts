import { priceTag } from "./priceTag"

function formatProductsData(products: any) {
    return products.map((product: any) => {
        return {
            name: product.name,
            quantity: product.quantity,
            price: priceTag(product.price),
            totalPerProduct: priceTag(product.price * product.quantity)
        }
    })
}

export { formatProductsData }