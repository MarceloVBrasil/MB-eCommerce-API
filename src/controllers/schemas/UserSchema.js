const { object, string } = require("yup")
const { isPostalCodeValid, isProvinceValid } = require("../../utils/validate")

class UserSchema {
    constructor() { }

    static getById() {
        return object().shape({
            id: string().required().uuid()
        })
    }

    static getByEmail() {
        return object().shape({
            email: string().required().email()
        })
    }

    static add() {
        return object().shape({
            name: string().required(),
            password: string().required(),
            email: string().required().email(),
            street: string().required(),
            city: string().required(),
            province: string().required().test('provinceValid', (province) => isProvinceValid(province)),
            postalCode: string().required().test('isPostalCodeValid', (postalCode) => isPostalCodeValid(postalCode))
        })
    }

    static update() {
        return object().shape({
            id: string().required().uuid(),
            name: string().required(),
            password: string().required(),
            email: string().required().email(),
            street: string().required(),
            city: string().required(),
            province: string().required().test('provinceValid', (province) => isProvinceValid(province)),
            postalCode: string().required().test('isPostalCodeValid', (postalCode) => isPostalCodeValid(postalCode))

        })
    }

    static delete() {
        return object().shape({
            id: string().required().uuid()
        })
    }

    static login() {
        return object().shape({
            email: string().required().email(),
            password: string().required()
        })
    }
}

module.exports = { UserSchema }