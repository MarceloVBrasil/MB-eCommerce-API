const { UserRepository } = require("../repositories/UserRepository")
const { AddressService } = require("./AddressService")
const { AuthenticationService } = require("./AuthenticationService")

const userRepository = new UserRepository()

class UserService {
    constructor() { }

    static async getById(id) {
        const idExists = await userRepository.checkExistence('id', id)
        if (!idExists) return {}
        const addressResult = await AddressService.getByUserId(id)
        const userResult = await userRepository.getById(id)
        delete userResult.password
        return { ...userResult, ...addressResult }
    }

    static async getByEmail(email) {
        const emailExists = await userRepository.checkExistence('email', email)
        if (!emailExists) return {}
        return await userRepository.getByEmail(email)
    }

    static async getByOrderId(orderId) {
        // get cartId associated with orderId
        // get userId associated with cartId
        // return user associated with userId
    }

    static async add(data) {
        const emailExists = await userRepository.checkExistence('email', data.email)
        if (emailExists) return {}
        const { userId, addressId, name, password, email, street, city, province, postalCode, complement } = data
        const user = { id: userId, name, password, email }
        const address = { id: addressId, street, city, province, postalCode, complement, user_id: userId }
        const addressResult = await AddressService.add(address)
        const userResult = await userRepository.add(user)
        return { ...userResult, ...addressResult }
    }

    static async update(id, data) {
        const emailBelongsToSomeoneElse = await this._checkIfEmailBelongsToSomeoneElse(data.email, id)
        if (emailBelongsToSomeoneElse) return {}
        const { name, password, email, street, city, province, postalCode, complement } = data
        const user = { name, password, email }
        const address = { street, city, province, postalCode, complement }
        const addressResult = await AddressService.update(id, address)
        const userResult = await userRepository.update(id, user)
        return { ...userResult, ...addressResult }
    }

    static async delete(id) {
        return await userRepository.delete(id)
    }

    static async login(credentials) {
        const user = await userRepository.login(credentials.email, credentials.password)
        if (!user) return {}
        const token = AuthenticationService.signJWT(user.email)
        return { id: user.id, name: user.name, email: user.email, token }
    }

    static async _checkIfEmailBelongsToSomeoneElse(email, myId) {
        const user = await userRepository.checkExistence('email', email)
        return user && user?.id !== myId ? true : false
    }
}

module.exports = { UserService }