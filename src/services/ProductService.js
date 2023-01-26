const { ProductRepository } = require("../repositories/ProductRepository")
const { BrandService } = require("./BrandService")
const { CategoryService } = require("./CategoryService")

const productRepository = new ProductRepository()

class ProductService {
    constructor() { }
    
    static async getAll() {
        return await productRepository.getAll()
    }

    static async getById(id) {
        const productExists = await productRepository.checkExistence('id', id)
        if (!productExists) return {}

        const productsResult = await productRepository.getById(id)
        const brandResult = await BrandService.getById(productsResult.brand_id)
        const categoryResult = await CategoryService.getById(productsResult.category_id)

        const { name, description, price, quantity, image } = productsResult
        const { name: brand } = brandResult
        const { name: category } = categoryResult
        
        return {id, name, description, price, quantity, image, brand, category}
    }

    static async add(product) {
        const productExists = await productRepository.checkExistence('name', product.name)
        if (productExists) return {}

        const brandExists = await BrandService.checkExistence('name', product.brand)
        if (!brandExists) product.brand_id = await BrandService.add(product.brand)
        else product.brand_id = await BrandService.getId(product.brand)

        const categoryExists = await CategoryService.checkExistence('name', product.category)
        if (!categoryExists) product.category_id = await CategoryService.add(product.category)
        else product.category_id = await CategoryService.getId(product.category)

        const productResult = await productRepository.add(product)
        return productResult
    }

    static async update(id, product) {
         const productExists = await productRepository.checkExistence('id', id)
        if (!productExists) return {}

        const brandExists = await BrandService.checkExistence('name', product.brand)
        if (!brandExists) product.brand_id = await BrandService.add(product.brand)
        else product.brand_id = await BrandService.getId(product.brand)

        const categoryExists = await CategoryService.checkExistence('name', product.category)
        if (!categoryExists) product.category_id = await CategoryService.add(product.category)
        else product.category_id = await CategoryService.getId(product.category)

        const productResult = await productRepository.update(id, product)
        return productResult
    }

    static async delete(id) {
        return await productRepository.delete(id)
    }
}

module.exports = { ProductService }