import { InMemoryOrderRepository } from "../../repositories/inMemory/inMemoryOrderRepository";
import { OrderService } from "../OrderService";

const { TEST_ENVIRONMENT } = process.env

let orderService: OrderService | null = null

export function OrderFactory() {
    if (!orderService && TEST_ENVIRONMENT) {
        orderService = new OrderService(new InMemoryOrderRepository())
    }

    else if (!orderService) {
        orderService = new OrderService(new InMemoryOrderRepository())
    }

    return orderService
}