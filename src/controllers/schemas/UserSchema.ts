import { object, string } from "yup"
import { isPostalCodeValid, isProvinceValid } from "../../utils/validate"

export class UserSchema {
    constructor() { }

    getById() {
        return object().shape({
            id: string().required().uuid()
        })
    }

    getByEmail() {
        return object().shape({
            email: string().required().email()
        })
    }

    add() {
        return object().shape({
            name: string().required(),
            password: string().required(),
            email: string().required().email(),
            street: string().required(),
            city: string().required(),
            province: string().required().test('provinceValid', (province) => isProvinceValid(province as string)),
            postalCode: string().required().test('isPostalCodeValid', (postalCode) => isPostalCodeValid(postalCode as string))
        })
    }

    update() {
        return object().shape({
            id: string().required().uuid(),
            name: string().required(),
            password: string().required(),
            email: string().required().email(),
            street: string().required(),
            city: string().required(),
            province: string().required().test('provinceValid', (province) => isProvinceValid(province as string)),
            postalCode: string().required().test('isPostalCodeValid', (postalCode) => isPostalCodeValid(postalCode as string))

        })
    }

    delete() {
        return object().shape({
            id: string().required().uuid()
        })
    }

    login() {
        return object().shape({
            email: string().required().email(),
            password: string().required()
        })
    }
}