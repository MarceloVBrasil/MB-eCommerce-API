import { IProductInCart } from "../../models/ProductInCart"
import { IProductsInCartrepository } from "../interfaces/IProductsInCartRepository"
import { INamedProductInCart } from "../interfaces/view models/INamedProductInCart"
import { assignProductNameAndQuantityAndUnitPriceForProductsInCart } from "./helpers/ProductInCartHelper"

export class InMemoryProductsInCartRepository implements IProductsInCartrepository {
    private _productsInCart: IProductInCart[]
    constructor() {
        this._productsInCart = []
    }

    async getByCartId(cartId: string): Promise<INamedProductInCart[]> {
        const productsInCart = this._productsInCart.filter(product => product.cartId === cartId)
        return assignProductNameAndQuantityAndUnitPriceForProductsInCart(productsInCart)
    }

    async add(data: IProductInCart): Promise<INamedProductInCart[]> {
        data.id = crypto.randomUUID()
        this._productsInCart.push(data)

        const productsInCart = this._productsInCart.filter(productInCart => productInCart.cartId === data.cartId && productInCart.productId === data.productId)
        return assignProductNameAndQuantityAndUnitPriceForProductsInCart(productsInCart)
    }

    async delete(cartId: string, productId: string): Promise<INamedProductInCart[]> {
        const productToBeDeletedIndex =
            this._productsInCart.findIndex(productInCart => productInCart.cartId === cartId && productInCart.productId === productId)

        this._productsInCart = this._productsInCart.filter((productInCart, index) => index !== productToBeDeletedIndex)
        const productsInCart = this._productsInCart.filter(productInCart => productInCart.cartId === cartId && productInCart.productId === productId)
        return assignProductNameAndQuantityAndUnitPriceForProductsInCart(productsInCart)
    }
}