import { object, string, number } from "yup"

export class CartSchema {
    constructor() { }

    update() {
        return object().shape({
            productId: string().required('productId is required').uuid('productId must be an uuid'),
            increasedBy: number().required().integer().test((increment) => increment === -1 || increment === 1)
        })
    }

    add() {
        return object().shape({
            productId: string().required().uuid('productId must be an uuid'),
        })
    }
}