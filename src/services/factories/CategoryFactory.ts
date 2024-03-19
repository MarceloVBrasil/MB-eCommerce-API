import { InMemoryCategoryRepository } from "../../repositories/inMemory/inMemoryCategoryRepository";
import { CategoryService } from "../CategoryService"

const { TEST_ENVIRONMENT } = process.env

let categoryService: CategoryService | null = null

export function CategoryFactory() {
    if (!categoryService && TEST_ENVIRONMENT) {
        categoryService = new CategoryService(new InMemoryCategoryRepository())
    }

    else if (!categoryService) {
        categoryService = new CategoryService(new InMemoryCategoryRepository())
    }

    return categoryService
}