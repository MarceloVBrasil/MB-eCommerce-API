import { IBrandRepository } from "../repositories/interfaces/IBrandRepository"
import { IBrand } from "../models/Brand"

export class BrandService {
    constructor(private brandRepository: IBrandRepository) { }

    async getByName(name: string) {
        return await this.brandRepository.getByName(name)
    }

    async getById(id: string) {
        return await this.brandRepository.getById(id)
    }

    async add(brand: IBrand) {
        const doesBrandExist = await this.brandRepository.getByName(brand.name)
        if (!!doesBrandExist) throw new Error('Brand already exists')

        return await this.brandRepository.add(brand)
    }

    async update(brandId: string, brand: IBrand) {
        const doesBrandExist = this.brandRepository.getById(brandId)
        if (!doesBrandExist) throw new Error('Brand does not exist')

        const doesBrandNameExist = await this.brandRepository.getByName(brand.name)
        if (!!doesBrandNameExist) throw new Error('Brand already exists')

        return await this.brandRepository.update(brandId, brand)
    }

    async delete(brandId: string) {
        const doesBrandExist = await this.brandRepository.getById(brandId)
        if (!doesBrandExist) throw new Error('Brand does not exist')

        return this.brandRepository.delete(brandId)
    }
}