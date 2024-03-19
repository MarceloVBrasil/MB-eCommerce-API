import { InMemoryCartRepository } from "../../repositories/inMemory/inMemoryCartRepository";
import { CartService } from "../CartService";

const { TEST_ENVIRONMENT } = process.env

let cartService: CartService | null = null

export function CartFactory() {
    if (!cartService && TEST_ENVIRONMENT) {
        cartService = new CartService(new InMemoryCartRepository())
    }

    else if (!cartService) {
        cartService = new CartService(new InMemoryCartRepository())
    }

    return cartService
}