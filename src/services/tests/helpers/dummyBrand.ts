import { IBrand } from "../../../models/Brand"
import { BrandFactory } from "../../factories/BrandFactory"

const brandService = BrandFactory()

async function addDummyBrand(): Promise<IBrand> {
    const brand = generateDummyBrand()

    return await brandService.add(brand)
}

function generateDummyBrand(name?: string): IBrand {
    return { name: `New Brand - ${crypto.randomUUID()}` }
}

export { addDummyBrand }