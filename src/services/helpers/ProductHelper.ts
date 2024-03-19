import { IProduct } from "../../models/Product";
import { ProductFactory } from "../factories/ProductFactory";

async function decreaseProductQuantityByOne(product: IProduct) {
    const productService = ProductFactory()

    const newQuantity = product.quantity - 1

    return await productService.update(product.id!, { ...product, quantity: newQuantity })
}

export { decreaseProductQuantityByOne }