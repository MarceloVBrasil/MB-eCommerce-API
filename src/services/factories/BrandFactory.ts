import { InMemoryBrandRepository } from "../../repositories/inMemory/inMemoryBrandRepository";
import { BrandService } from "../BrandService";

const { TEST_ENVIRONMENT } = process.env

let brandService: BrandService | null = null


export function BrandFactory() {
    if (!brandService && TEST_ENVIRONMENT) {
        brandService = new BrandService(new InMemoryBrandRepository())
    }

    else if (!brandService) {
        brandService = new BrandService(new InMemoryBrandRepository())
    }

    return brandService
}