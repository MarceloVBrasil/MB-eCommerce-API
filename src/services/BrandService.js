const { v4: uuidV4 } = require("uuid")
const { BrandRepository } = require("../repositories/BrandRepository")
const brandRepository = new BrandRepository()

class BrandService {
    constructor() { }

    static async getId(name) {
        return await brandRepository.getId(name)
    }

    static async getById(id) {
        return await brandRepository.getById(id)
    }
    
    static async add(name) {
        const brand = {id: uuidV4(), name}
        return await brandRepository.add(brand)
    }

    static async checkExistence(key, value) {
        return await brandRepository.checkExistence(key, value)
    }
}

module.exports = { BrandService }