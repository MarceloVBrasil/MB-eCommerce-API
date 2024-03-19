import { ICategory } from "../../models/Category"
import { ICategoryRepository } from "../interfaces/ICategoryRepository"

export class InMemoryCategoryRepository implements ICategoryRepository {
    private _categories: ICategory[]
    constructor() {
        this._categories = [
            { id: '9d0b0267-a6c4-4411-aec7-551d1bb237ba', name: "Computers" },
            { id: '077e21e3-e37b-4353-bc8a-cedada17aea3', name: "Computers Accessories" },
            { id: '1567b4cf-fb56-445c-aa9a-47e6e1458860', name: "Games" },
        ]
    }

    async getById(id: string): Promise<ICategory> {
        return this._categories.find(category => category.id === id)!
    }

    async getByName(name: string): Promise<ICategory> {
        return this._categories.find(category => category.name === name)!
    }

    async add(category: ICategory): Promise<ICategory> {
        category.id = crypto.randomUUID()
        this._categories.push(category)

        return category
    }

    async update(id: string, category: ICategory): Promise<ICategory> {
        const categoryIndex = this._categories.findIndex(category => category.id === id)
        this._categories[categoryIndex] = { id, ...category }

        return this._categories[categoryIndex]
    }

    async delete(id: string): Promise<string> {
        this._categories = this._categories.filter(category => category.id !== id)
        return id
    }
}