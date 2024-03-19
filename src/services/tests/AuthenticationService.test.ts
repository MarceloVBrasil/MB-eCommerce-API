import { describe, test, expect } from "@jest/globals"

import { CartFactory } from "../factories/CartFactory"
import { registerDummyUser } from "./helpers/dummyAuthentication"
import { generateDummyUser } from "./helpers/dummyUser"
import { AuthFactory } from "../factories/AuthFactory"
import { generateDummyAddress } from "./helpers/dummyAddress"
import { canadianProvinces } from "../../models/Address"

const authService = AuthFactory()
const cartService = CartFactory()

describe('Authentication Service', () => {
    describe('login', () => {
        describe('success', () => {
            test("login method must be defined", () => {
                expect(authService.login).toBeDefined()
            })

            test('log in successfully', async () => {
                const password = crypto.randomUUID()
                const dummyUserAndAddress = await registerDummyUser({ password })

                const token = await authService.login(dummyUserAndAddress.user.email, password)

                expect(token).not.toBeUndefined()
            })
        })

        describe('fail', () => {
            test('log in failed | wrong email', async () => {
                const dummyUserAndAddress = await registerDummyUser()

                const promise = authService.login(`invalid.email${crypto.randomUUID()}@gmail.com`, dummyUserAndAddress.user.password)

                expect(promise).rejects.toThrow(new Error('Invalid Email and/or Password'))
            })

            test('log in failed | wrong password', async () => {
                const dummyUserAndAddress = await registerDummyUser()

                const promise = authService.login(dummyUserAndAddress.user.email, crypto.randomUUID())

                expect(promise).rejects.toThrow(new Error('Invalid Email and/or Password'))
            })
        })
    })

    describe("register", () => {
        describe("success", () => {
            test("register method must be defined", () => {
                expect(authService.register).toBeDefined()
            })

            test("register new user successfully", async () => {
                const dummyUserAndAddress = await registerDummyUser()

                const cart = await cartService.getOpenedByUserId(dummyUserAndAddress.user.id!)

                expect(dummyUserAndAddress).toHaveProperty('user')
                expect(dummyUserAndAddress).toHaveProperty('address')

                expect(dummyUserAndAddress.user).toHaveProperty('id')
                expect(dummyUserAndAddress.address).toHaveProperty('id')

                expect(cart).toHaveProperty('id')
                expect(cart).toHaveProperty('userId')
                expect(cart).toHaveProperty('status')

                expect(cart.userId).toBe(dummyUserAndAddress.user.id)
                expect(cart.status).toBe('open')
            })
        })

        describe("fail", () => {
            test("register failed | email already exists", async () => {
                const dummyUserAndAddress = await registerDummyUser()

                const promise = authService.register(dummyUserAndAddress)

                expect(promise).rejects.toThrow(new Error('Email already exists'))
            })

            test("register failed | invalid province", async () => {
                const data = {
                    user: generateDummyUser(),
                    address: await generateDummyAddress({ province: 'invalid province' as canadianProvinces })
                }

                const promise = authService.register(data)

                expect(promise).rejects.toThrow(new Error('Invalid province'))
            })
        })
    })
})