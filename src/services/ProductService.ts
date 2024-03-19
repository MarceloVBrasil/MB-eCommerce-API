
import { IProduct } from "../models/Product"
import { IProductRepository } from "../repositories/interfaces/IProductRepository"
import { BrandFactory } from "./factories/BrandFactory"
import { CategoryFactory } from "./factories/CategoryFactory"

export class ProductService {
    constructor(private productRepository: IProductRepository) { }

    async getAll() {
        return await this.productRepository.getAll()
    }

    async getById(id: string) {
        return await this.productRepository.getById(id)
    }

    async getByIdWithBrandAndCategory(id: string) {
        const doesProductExist = await this.productRepository.getById(id)
        if (!doesProductExist) throw new Error("Product does not exist")

        return await this.productRepository.getByIdWithBrandAndCategory(id)
    }

    async add(product: IProduct) {
        const brandService = BrandFactory()
        const categoryService = CategoryFactory()

        const doesProductExist = await this.productRepository.getByName(product.name)
        if (doesProductExist) throw new Error('Product already exists')

        const doesBrandExist = await brandService.getById(product.brandId)
        if (!doesBrandExist) throw new Error('Brand does not exist')

        const doesCategoryExist = await categoryService.getById(product.categoryId)
        if (!doesCategoryExist) throw new Error("Category does not exist")

        return await this.productRepository.add(product)

    }

    async update(id: string, product: IProduct) {
        const brandService = BrandFactory()
        const categoryService = CategoryFactory()

        const doesProductExist = await this.productRepository.getById(id)
        if (!doesProductExist) throw new Error('Product does not exist')

        const doesBrandExist = await brandService.getById(product.brandId)
        if (!doesBrandExist) throw new Error('Brand does not exist')

        const doesCategoryExist = await categoryService.getById(product.categoryId)
        if (!doesCategoryExist) throw new Error('Category does not exist')

        const doesProductGotByNameExist = await this.productRepository.getByName(product.name)
        if (!!doesProductGotByNameExist && id != doesProductGotByNameExist.id) throw new Error('Product already exists')

        await this.productRepository.update(id, product)
        return product
    }

    async delete(id: string) {
        const doesProductExist = await this.productRepository.getById(id)
        if (!doesProductExist) throw new Error('Product does not exist')

        return await this.productRepository.delete(id)
    }
}