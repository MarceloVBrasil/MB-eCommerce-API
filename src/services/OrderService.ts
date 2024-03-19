import { ProductsInCartFactory } from "./factories/ProductsInCartFactory"
import { IOrderRepository } from "../repositories/interfaces/IOrderRepository";
import { calculateOrderTotalCost } from "./helpers/OrderHelper";
import { CartFactory } from "./factories/CartFactory";
import { AddressFactory } from "./factories/AddressFactory";
import { UserFactory } from "./factories/UserFactory";
import { EmailFactory } from "./factories/EmailFactory";
import { PaymentEfiFactory } from "./factories/PaymentEfiFactory";

export class OrderService {
    constructor(private orderRepository: IOrderRepository) { }

    async getAll() {
        return await this.orderRepository.getAll()
    }

    async add(cartId: string) {
        const cartService = CartFactory()
        const productInCartService = ProductsInCartFactory()
        const userService = UserFactory()
        const addressService = AddressFactory()
        const emailService = EmailFactory()
        const paymentService = PaymentEfiFactory()

        const productsInCart = await productInCartService.getByCartId(cartId)
        const orderTotalCost = calculateOrderTotalCost(productsInCart)

        const { userId } = await cartService.close(cartId)
        const user = await userService.getById(userId)
        const address = await addressService.getByUserId(userId)

        const order = await this.orderRepository.add({ cartId, total: orderTotalCost, date: new Date() })
        const response = await paymentService.createBolix(productsInCart, user)

        await emailService.sendPurchaseReceipt(user, order, productsInCart)
        await emailService.sendSalesReceipt(user, address, order, productsInCart)
        await emailService.sendBolix(response.data.data.link)


        return order
    }
}