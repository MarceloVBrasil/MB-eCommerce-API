import { describe, test, expect } from "@jest/globals"

import { registerDummyUser } from "./helpers/dummyAuthentication"
import { CartFactory } from "../factories/CartFactory"
import { addDummyUser } from "./helpers/dummyUser"
import { addDummyCart } from "./helpers/dummyCart"

const cartService = CartFactory()

describe("Cart Service", () => {

    describe("get opened by user id", () => {
        describe("success", () => {
            test("get opened by user id method must be defined", () => {
                expect(cartService.getOpenedByUserId).toBeDefined()
            })

            test("get opened cart by user id successfully", async () => {
                const dummyUserAndAddress = await registerDummyUser()

                const cart = await cartService.getOpenedByUserId(dummyUserAndAddress.user.id!)

                expect(cart).toHaveProperty('id')
                expect(cart).toHaveProperty('userId')
                expect(cart).toHaveProperty('status')

                expect(cart.userId).toBe(dummyUserAndAddress.user.id)
                expect(cart.status).toBe('open')
            })
        })
    })

    describe("open by user id", () => {
        describe("success", () => {
            test("open by user id method must be defined", () => {
                expect(cartService.openByUserId).toBeDefined()
            })

            test("open cart by user id successfully", async () => {
                const dummyUser = await addDummyUser()

                const cart = await cartService.openByUserId(dummyUser.id!)

                expect(cart).toHaveProperty('id')
                expect(cart).toHaveProperty('userId')
                expect(cart).toHaveProperty('status')

                expect(cart.status).toBe('open')
            })
        })
    })

    describe("close", () => {
        describe("success", () => {
            test("close cart by cart id method must be defined", () => {
                expect(cartService.close).toBeDefined()
            })

            test("close cart successfully", async () => {
                const { id: cartId, userId } = await addDummyCart()

                const cart = await cartService.close(cartId!)
                expect(cart).toHaveProperty('id')
                expect(cart).toHaveProperty('userId')
                expect(cart).toHaveProperty('status')

                expect(cart.status).toBe('closed')
            })
        })
    })
})