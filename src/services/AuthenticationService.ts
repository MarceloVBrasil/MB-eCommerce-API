import * as bcrypt from "bcryptjs"
import { decodeJWT, generateJTW, verifyJWT } from "./helpers/AuthHelpers"
import { validateProvince } from "./helpers/AddressHelper"
import { UserFactory } from "./factories/UserFactory"
import { AddressFactory } from "./factories/AddressFactory"
import { CartFactory } from "./factories/CartFactory"
import { IUser } from "../models/User"
import { IAddress } from "../models/Address"

export class AuthenticationService {
    constructor() { }

    async login(email: string, password: string) {
        const userService = UserFactory()
        const cartService = CartFactory()

        const doesUserExist = await userService.getByEmail(email)
        if (!doesUserExist) throw new Error("Invalid Email and/or Password")

        const doesPAsswordMatch = bcrypt.compareSync(password, doesUserExist.password)
        if (!doesPAsswordMatch) throw new Error("Invalid Email and/or Password")

        const cart = await cartService.getOpenedByUserId(doesUserExist.id!)

        const payload = {
            id: doesUserExist.id,
            name: doesUserExist.name,
            cartId: cart.id
        }

        const token = generateJTW(payload, "1d")
        return token
    }

    async register(data: { user: IUser, address: IAddress }) {
        const userService = UserFactory()
        const addressService = AddressFactory()
        const cartService = CartFactory()

        const { user, address } = data

        const doesEmailExist = await userService.getByEmail(user.email)
        if (doesEmailExist) throw new Error('Email already exists')

        const isProvinceValid = validateProvince(address.province)
        if (!isProvinceValid) throw new Error('Invalid province')

        const newUser = await userService.add(user)

        address.userId = newUser.id!
        const newAddres = await addressService.add(address)

        await cartService.openByUserId(newUser.id!)

        return { user: newUser, address: newAddres }
    }

    async refreshToken(data: any) {
        const isTokenValid = verifyJWT(data.token)
        if (!isTokenValid) throw new Error("Invalid Token")

        const { id, name, cartId } = decodeJWT(data.token)
        const payload = { id, name, cartId }

        const token = generateJTW(payload, "1d")
        return token
    }
}