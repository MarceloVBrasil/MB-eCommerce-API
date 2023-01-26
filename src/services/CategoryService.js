const { v4: uuidV4 } = require("uuid")
const { CategoryRepository } = require("../repositories/CategoryRepository")
const categoryRepository = new CategoryRepository()

class CategoryService {
    constructor() { }
    
    static async getId(name) {
        return await categoryRepository.getId(name)
    }

    static async getById(id) {
        return await categoryRepository.getById(id)
    }

    static async add(name) {
        const category = {id: uuidV4(), name}
        return await categoryRepository.add(category)
    }

    static async checkExistence(key, value) {
        return await categoryRepository.checkExistence(key, value)
    }
}

module.exports = { CategoryService }