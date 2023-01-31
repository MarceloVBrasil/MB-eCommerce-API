const { object, string, number, mixed } = require("yup")
const { isFileValid } = require("../utils/validate")

class ProductSchema {
    constructor() { }
    
    static getById() {
        return object().shape({
            id: string().required().uuid()
        })
    }

    static add() {
        return object().shape({
            name: string().required(),
            description: string().required(),
            price: number().positive().required(),
            quantity: number().positive().integer().required(),
            brand: string().required(),
            category: string().required()
        })
    }

    static update() {
        return object().shape({
            id: string().required().uuid(),
            name: string().required(),
            description: string().required(),
            price: number().positive().required(),
            quantity: number().positive().integer().required(),
            brand: string().required(),
            category: string().required()
        })
    }

    static delete() {
        return object().shape({
            id: string().required().uuid()
        })
    }
}

module.exports = { ProductSchema }