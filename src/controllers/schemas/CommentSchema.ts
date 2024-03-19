import { object, string } from "yup"

export class CommentSchema {
    constructor() { }

    getAll() {
        return object().shape({
            productId: string().required().uuid()
        })
    }

    add() {
        return object().shape({
            productId: string().required().uuid(),
            message: string().required(),
            userId: string().required().uuid()
        })
    }
}