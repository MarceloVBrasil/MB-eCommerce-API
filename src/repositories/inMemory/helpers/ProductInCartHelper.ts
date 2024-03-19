import { IProductInCart } from "../../../models/ProductInCart";
import { INamedProductInCart } from "../../interfaces/view models/INamedProductInCart";
import { ProductFactory } from "../../../services/factories/ProductFactory"

async function assignProductNameAndQuantityAndUnitPriceForProductsInCart(productsInCart: IProductInCart[]): Promise<INamedProductInCart[]> {
    const productService = ProductFactory()
    const distinctProductsIdsInCart = getDistinctProductsInCart(productsInCart)

    return Promise.all(distinctProductsIdsInCart.map(async productId => {
        const product = await productService.getById(productId)
        const productQuantityInCart = getProductQuantityInCart(productsInCart, productId)
        return { name: product.name, quantity: productQuantityInCart, unitPrice: product.price }
    }))
}

function getDistinctProductsInCart(productsInCart: IProductInCart[]): string[] {
    const allProductsIds = productsInCart.map(productInCart => productInCart.productId)
    return [... new Set(allProductsIds)]
}

function getProductQuantityInCart(productsInCart: IProductInCart[], productId: string): number {
    return productsInCart.filter(productInCart => productInCart.productId === productId).length
}

export { assignProductNameAndQuantityAndUnitPriceForProductsInCart }