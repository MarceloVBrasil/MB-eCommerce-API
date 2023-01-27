const { object, string } = require("yup")

class OrderSchema {
    constructor(){}

    static add() {
        return object().shape({
            email: string().required().email()
        })
    }
}

module.exports = { OrderSchema }