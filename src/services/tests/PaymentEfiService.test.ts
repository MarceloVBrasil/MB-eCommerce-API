import { describe, expect, test } from "@jest/globals";
import { PaymentEfiFactory } from "../factories/PaymentEfiFactory";
import { addDummyProductToCart, addMultipleSameDummyProductsToCartAndReturnThem } from "./helpers/dummyProductInCart";
import { addDummyUser } from "./helpers/dummyUser";

const paymentEfiService = PaymentEfiFactory()

describe("Payment Efi Service", () => {
    describe("authenticate pix", () => {
        test("authenticate method must be defined", () => {
            expect(paymentEfiService.authenticatePix).toBeDefined()
        })

        test("authenticate pix successfully", async () => {
            const response = await paymentEfiService.authenticatePix()

            expect(response.data).toHaveProperty('access_token')
        })
    })

    describe("authenticate bolix", () => {
        test("authenticate method must be defined", () => {
            expect(paymentEfiService.authenticateBolix).toBeDefined()
        })

        test("authenticate bolix successfully", async () => {
            const response = await paymentEfiService.authenticateBolix()

            expect(response.data).toHaveProperty('access_token')
            expect(response.data).toHaveProperty('refresh_token')
        })
    })

    describe("create bolix", () => {
        test("create method must be defined", () => {
            expect(paymentEfiService.createBolix).toBeDefined()
        })

        test("create bolix successfully", async () => {
            const dummyProductInCart = await addMultipleSameDummyProductsToCartAndReturnThem()
            const dummyUser = await addDummyUser()

            const response = await paymentEfiService.createBolix(dummyProductInCart, dummyUser)

            expect(response.data).toHaveProperty('data')
            expect(response.data.data).toHaveProperty('pdf')
        }, 20_000)
    })
})