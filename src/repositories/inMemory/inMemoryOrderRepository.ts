import { IOrder } from "../../models/Order"
import { IOrderRepository } from "../interfaces/IOrderRepository"

export class InMemoryOrderRepository implements IOrderRepository {
    private _orders: IOrder[]
    constructor() {
        this._orders = []
    }

    async getAll(): Promise<IOrder[]> {
        return this._orders
    }

    async add(order: IOrder): Promise<IOrder> {
        order.id = crypto.randomUUID()

        this._orders.push(order)
        return order
    }
}