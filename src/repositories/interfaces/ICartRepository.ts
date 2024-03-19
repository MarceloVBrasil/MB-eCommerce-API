import { ICart } from "../../models/Cart"

export interface ICartRepository {
    getOpenedByUserId(userId: string): Promise<ICart>
    openByUserId(userId: string): Promise<ICart>
    close(cartId: string): Promise<ICart>
}