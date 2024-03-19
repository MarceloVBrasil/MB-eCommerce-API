import { ICategory } from "../../../models/Category"
import { CategoryFactory } from "../../factories/CategoryFactory"

const categoryFactory = CategoryFactory()

async function addDummyCategory(): Promise<ICategory> {
    const category = generateDummyCategory()

    return await categoryFactory.add(category)
}

function generateDummyCategory(): ICategory {
    return { name: `New Category - ${crypto.randomUUID()}` }
}

export { addDummyCategory }