const { object, string, number } = require("yup")

class CartSchema {
    constructor() { }
    
    static update() {
        return object().shape({
            userId: string().required().uuid(),
            productId: string().required().uuid(),
            increasedBy: number().required().integer().test((increment) => increment === -1 || increment === 1)
        })
    }

    static add() {
        return object().shape({
            userId: string().required().uuid(),
            productId: string().required().uuid(),
        })
    }

    static getProducts() {
        return object().shape({
            userId: string().required().uuid()
        })
    }
}

module.exports = { CartSchema }