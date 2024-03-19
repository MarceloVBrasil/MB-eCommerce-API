import { IProductInCart } from "../../models/ProductInCart"
import { INamedProductInCart } from "./view models/INamedProductInCart"

export interface IProductsInCartrepository {
    getByCartId(cartId: string): Promise<INamedProductInCart[]>
    add(data: IProductInCart): Promise<INamedProductInCart[]>
    delete(cartId: string, productId: string): Promise<INamedProductInCart[]>
}