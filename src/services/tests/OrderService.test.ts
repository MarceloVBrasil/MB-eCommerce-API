import { describe, expect, test } from "@jest/globals"
import { OrderFactory } from "../factories/OrderFactory"
import { addDummyOrderWithThisManyProducts } from "./helpers/dummyOrder"
import { addDummyCart } from "./helpers/dummyCart"
import { addDummyProduct } from "./helpers/dummyProduct"
import { ProductsInCartFactory } from "../factories/ProductsInCartFactory"

const orderService = OrderFactory()

describe("Order Service", () => {
    describe("get all", () => {
        describe("success", () => {
            test("get all method must be defined", () => {
                expect(orderService.getAll).toBeDefined()
            })

            test("get all successfully", async () => {
                await addDummyOrderWithThisManyProducts(10)

                const orders = await orderService.getAll()

                expect(orders).toHaveLength(1)

                expect(orders[0]).toHaveProperty('id')
                expect(orders[0]).toHaveProperty('cartId')
                expect(orders[0]).toHaveProperty('total')
                expect(orders[0]).toHaveProperty('date')
            }, 35_000)
        })
    })

    describe("add", () => {
        describe("success", () => {
            test("add method must be defined", () => {
                expect(orderService.add).toBeDefined()
            })

            test("add an order successfully", async () => {
                const productInCartService = ProductsInCartFactory()

                const dummyCart = await addDummyCart()
                const dummyProduct = await addDummyProduct()
                const anotherDummyProduct = await addDummyProduct()

                await productInCartService.add({ cartId: dummyCart.id!, productId: dummyProduct.id! })
                await productInCartService.add({ cartId: dummyCart.id!, productId: anotherDummyProduct.id! })

                const order = await orderService.add(dummyCart.id!)

                expect(order).toHaveProperty('id')
                expect(order).toHaveProperty('cartId')
                expect(order).toHaveProperty('total')
                expect(order).toHaveProperty('date')

                expect(order.total).toBe(dummyProduct.price + anotherDummyProduct.price)
            }, 35_000)
        })
    })
})