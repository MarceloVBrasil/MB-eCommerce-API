import { ICategory } from "../models/Category"
import { ICategoryRepository } from "../repositories/interfaces/ICategoryRepository"

export class CategoryService {
    constructor(private categoryRepository: ICategoryRepository) { }

    async getByName(name: string) {
        return await this.categoryRepository.getByName(name)
    }

    async getById(id: string) {
        return await this.categoryRepository.getById(id)
    }

    async add(category: ICategory) {
        const doesCategoryExist = await this.categoryRepository.getByName(category.name)
        if (!!doesCategoryExist) throw new Error('Category already exists')

        return await this.categoryRepository.add(category)
    }

    async update(id: string, category: ICategory) {
        const doesCategoryExist = await this.categoryRepository.getById(id)
        if (!doesCategoryExist) throw new Error('Category does not exist')

        const doesCategorynameExist = await this.categoryRepository.getByName(category.name)
        if (!!doesCategorynameExist) throw new Error('Category already exists')

        return await this.categoryRepository.update(id, category)
    }

    async delete(id: string) {
        const doesCategoryExist = await this.categoryRepository.getById(id)
        if (!doesCategoryExist) throw new Error('Category does not exist')

        return this.categoryRepository.delete(id)
    }
}