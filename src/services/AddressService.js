const { AddressRepository } = require("../repositories/AddressRepository")
const addressRepository = new AddressRepository()

class AddressService {
    constructor() { }
    
    static async getByUserId(userId) {
        const address = await addressRepository.getByUserId(userId)
        return {street: address.street, city: address.city, province: address.province, postalCode: address.postalCode, complement: address.complement}
    }

    static async add(address) {
        await addressRepository.add(address)
        return {street: address.street, city: address.city, province: address.province, postalCode: address.postalCode, complement: address.complement}
    }

    static async update(userId, address) {
        const addressToUpdate = await addressRepository.getByUserId(userId)
        address.id = addressToUpdate.id
        await addressRepository.update(userId, address)
        return {street: address.street, city: address.city, province: address.province, postalCode: address.postalCode, complement: address.complement}
    }

    static async delete(userId) {
        return await addressRepository.delete(userId)
    }
}

module.exports = { AddressService }