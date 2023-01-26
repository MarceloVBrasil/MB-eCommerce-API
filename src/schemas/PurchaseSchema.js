const { object, string, number } = require("yup")

class PurchaseSchema {
    constructor() { }
    
    static pay() {
        return object().shape({
            userId: string().required().uuid(),
            amount: number().positive()
        })
    }
}

module.exports = { PurchaseSchema }