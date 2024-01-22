const { object, string } = require("yup")

class OrderSchema {
    constructor(){}

    static add() {
        return object().shape({
            email: string().required().email()
        })
    }

    static getByUserId() {
        return object().shape({
            userId: string().required().uuid()
        })
    }

    static getById() {
        return object().shape({
            userId: string().required().uuid(),
            orderId: string().required().uuid()
        })
    }
}

module.exports = { OrderSchema }