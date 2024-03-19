import { InMemoryProductsInCartRepository } from "../../repositories/inMemory/inMemoryProductsInCartRepository";
import { ProductsInCartService } from "../ProductsInCartService";

const { TEST_ENVIRONMENT } = process.env

let productsInCartService: ProductsInCartService | null

export function ProductsInCartFactory() {
    if (!productsInCartService && TEST_ENVIRONMENT) {
        productsInCartService = new ProductsInCartService(new InMemoryProductsInCartRepository())
    }

    else if (!productsInCartService) {
        productsInCartService = new ProductsInCartService(new InMemoryProductsInCartRepository())
    }

    return productsInCartService
}