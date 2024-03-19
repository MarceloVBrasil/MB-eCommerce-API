import { ICartRepository } from "../repositories/interfaces/ICartRepository"
import { UserFactory } from "./factories/UserFactory"

export class CartService {
    constructor(private cartRepository: ICartRepository) { }

    async getOpenedByUserId(userId: string) {
        return this.cartRepository.getOpenedByUserId(userId)
    }

    async openByUserId(userId: string) {
        const userService = UserFactory()

        const doesUserExist = await userService.getById(userId)
        if (!doesUserExist) throw new Error('User does not exist')

        const doesOpenCartExist = await this.cartRepository.getOpenedByUserId(userId)
        if (!!doesOpenCartExist) throw new Error('Opened cart already exists')

        return this.cartRepository.openByUserId(userId)
    }

    async close(cartId: string) {
        return await this.cartRepository.close(cartId)
    }
}