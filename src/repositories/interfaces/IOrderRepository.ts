import { IOrder } from "../../models/Order"

export interface IOrderRepository {
    getAll(): Promise<IOrder[]>
    add(data: IOrder): Promise<IOrder>
}