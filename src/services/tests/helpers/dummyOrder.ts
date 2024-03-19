import { IOrder } from "../../../models/Order";
import { OrderFactory } from "../../factories/OrderFactory";
import { addMultipleSameDummyProductsToCart } from "./dummyProductInCart";

interface IAddDummyOrder {
    numberOfProductsInCart?: number
}

const orderService = OrderFactory()

async function addDummyOrderWithThisManyProducts(numberOfProductsInCart: number = 1): Promise<IOrder> {
    const { cartId, productId } = await addMultipleSameDummyProductsToCart(numberOfProductsInCart)

    return await orderService.add(cartId)
}

export { addDummyOrderWithThisManyProducts }