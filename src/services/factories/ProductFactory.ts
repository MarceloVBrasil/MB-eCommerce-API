import { InMemoryProductRepository } from "../../repositories/inMemory/inMemoryProductRepository";
import { ProductService } from "../ProductService";

const { TEST_ENVIRONMENT } = process.env

let productService: ProductService | null = null

export function ProductFactory() {
    if (!productService && TEST_ENVIRONMENT) {
        productService = new ProductService(new InMemoryProductRepository())
    }

    else if (!productService) {
        productService = new ProductService(new InMemoryProductRepository())
    }

    return productService
}