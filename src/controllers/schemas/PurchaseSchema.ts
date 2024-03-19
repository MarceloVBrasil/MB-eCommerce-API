import { object, number } from "yup"

export class PurchaseSchema {
    constructor() { }

    pay() {
        return object().shape({
            amount: number().positive('amount must be a greater than zero.')
        })
    }
}