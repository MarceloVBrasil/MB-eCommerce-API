import { ICart } from "../../models/Cart"
import { ICartRepository } from "../interfaces/ICartRepository"

export class InMemoryCartRepository implements ICartRepository {
    private _carts: ICart[]
    constructor() {
        this._carts = [
            { id: '58b1df5f-48bf-4004-8abf-6fc16bb9d798', userId: '11c6dbf0-b2db-4520-b306-ed7f1534e49b', status: 'open' }
        ]
    }

    async getOpenedByUserId(userId: string): Promise<ICart> {
        return this._carts.find(cart => cart.userId === userId && cart.status === 'open')!
    }

    async openByUserId(userId: string): Promise<ICart> {
        const cart: ICart = { id: crypto.randomUUID(), userId, status: 'open' }
        this._carts.push(cart)

        return cart
    }

    async close(cartId: string): Promise<ICart> {
        const openCartIndex = this._carts.findIndex(cart => cart.id === cartId)
        this._carts[openCartIndex] = { ...this._carts[openCartIndex], status: 'closed' }

        return this._carts[openCartIndex]
    }
}