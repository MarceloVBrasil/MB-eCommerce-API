import { object, string, number } from "yup"

export class ProductSchema {
    constructor() { }

    getById() {
        return object().shape({
            id: string().required().uuid()
        })
    }

    add() {
        return object().shape({
            name: string().required(),
            description: string().required(),
            price: number().positive().required(),
            quantity: number().positive().integer().required(),
            brand: string().required(),
            category: string().required()
        })
    }

    update() {
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

    delete() {
        return object().shape({
            id: string().required().uuid()
        })
    }
}