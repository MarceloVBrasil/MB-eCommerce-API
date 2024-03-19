import { object, string } from "yup"

export class OrderSchema {
    constructor() { }

    add() {
        return object().shape({
            email: string().required().email()
        })
    }

    getByUserId() {
        return object().shape({
            userId: string().required().uuid()
        })
    }

    getById() {
        return object().shape({
            userId: string().required().uuid(),
            orderId: string().required().uuid()
        })
    }
}