import { INamedProductInCart } from "../../repositories/interfaces/view models/INamedProductInCart";

function calculateOrderTotalCost(productsInCart: INamedProductInCart[]): number {
    return productsInCart.reduce((total, productInCart) => total + productInCart.quantity * productInCart.unitPrice, 0)
}

export { calculateOrderTotalCost }