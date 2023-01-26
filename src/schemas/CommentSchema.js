const { object, string } = require('yup')

class CommentSchema {
    constructor() { }
    
    static getAll() {
        return object().shape({
            productId: string().required().uuid()
        })
    }

    static add() {
        return object().shape({
            productId: string().required().uuid(),
            message: string().required(),
            userId: string().required().uuid()
        })
    }
}

module.exports = { CommentSchema }