import { IAddress } from "../models/Address"
import { IAddressRepository } from "../repositories/interfaces/IAddressRepository"
import { UserFactory } from "./factories/UserFactory"
import { validateProvince } from "./helpers/AddressHelper"

export class AddressService {
    constructor(private addressRepository: IAddressRepository) { }

    async getByUserId(userId: string) {
        return await this.addressRepository.getByUserId(userId)

    }

    async add(address: IAddress) {
        const userService = UserFactory()

        const doesUserExist = await userService.getById(address.userId)
        if (!doesUserExist) throw new Error('User does not exist')

        const doesAddressWithThisUserIdExist = await this.getByUserId(address.userId)
        if (!!doesAddressWithThisUserIdExist) throw new Error('Address associated with this user already exists')

        const isProvinceValid = validateProvince(address.province)
        if (!isProvinceValid) throw new Error('Invalid province')

        return await this.addressRepository.add(address)
    }

    async update(userId: string, address: IAddress) {
        const userService = UserFactory()

        const doesUserExist = await userService.getById(userId)
        if (!doesUserExist) throw new Error('User does not exist')

        const isProvinceValid = validateProvince(address.province)
        if (!isProvinceValid) throw new Error('Invalid province')

        if (userId !== address.userId) throw new Error("Cannot update someone else's address")

        return await this.addressRepository.update(userId, address)
    }

    async delete(userId: string) {
        const userService = UserFactory()

        const doesUserExist = await userService.getById(userId)
        if (!doesUserExist) throw new Error('User does not exist')

        return await this.addressRepository.delete(userId)
    }
}