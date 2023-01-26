class CategoryRepository {
    constructor() {
         this._categories = [
            { id:'9d0b0267-a6c4-4411-aec7-551d1bb237ba', name: "Computers" },
            { id:'077e21e3-e37b-4353-bc8a-cedada17aea3', name: "Computers Accessories" },
            { id:'1567b4cf-fb56-445c-aa9a-47e6e1458860', name: "Games"},
        ]
    }

    async getId(name) {
        return this._categories.find(category => category.name === name).id
    }

    async getById(id) {
        return this._categories.find(category => category.id === id)
    }

    async add(category) {
        this._categories.push(category)
        return category.id
    }

    async checkExistence(key, value) {
        return this._categories.find(category => category[`${key}`] === value)
    }
}

module.exports = { CategoryRepository }