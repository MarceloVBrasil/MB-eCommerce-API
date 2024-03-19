import { IUserRepository } from "../repositories/interfaces/IUserRepository"
import { encryptPassword } from "./helpers/AuthHelpers"

export class UserService {
    constructor(private userRepository: IUserRepository) { }

    async getById(id: string) {
        return await this.userRepository.getById(id)
    }

    async getByEmail(email: string) {
        return await this.userRepository.getByEmail(email)
    }

    async getByOrderId(orderId: string) {
        // get cartId associated with orderId
        // get userId associated with cartId
        // return user associated with userId
    }

    async add(user: any) {
        const doesEmailExist = await this.userRepository.getByEmail(user.email)
        if (doesEmailExist) throw new Error('Email already exists')

        user.password = await encryptPassword(user.password)

        return this.userRepository.add(user)
    }

    async update(id: string, data: any) {
        const doesUserGotByUserIdExist = await this.userRepository.getById(id)
        if (!doesUserGotByUserIdExist) throw new Error('User does not exist')

        const doesUserGotByEmailExist = await this.userRepository.getByEmail(data.email)
        if (!!doesUserGotByEmailExist && doesUserGotByEmailExist.id !== doesUserGotByUserIdExist.id) throw new Error('Email already exist')

        return this.userRepository.update(id, data)
    }

    async delete(id: string) {
        const doesUserExist = await this.userRepository.getById(id)
        if (!doesUserExist) throw new Error('User does not exist')

        return await this.userRepository.delete(id)
    }
}