import { describe, expect, test } from "@jest/globals"
import { ProductsInCartFactory } from "../factories/ProductsInCartFactory"
import { ProductFactory } from "../factories/ProductFactory"
import { addDummyProduct, addUnavailableDummyProduct } from "./helpers/dummyProduct"
import {
    addDummyProductToCart,
    addMultipleSameDummyProductsToCart,
    generateDummyProductToCart
} from "./helpers/dummyProductInCart"

const productsInCartService = ProductsInCartFactory()

describe("Product In Cart", () => {
    describe("get by cart id", () => {
        describe("success", () => {
            test("get by cart id method must be defined", () => {
                expect(productsInCartService.getByCartId).toBeDefined()
            })

            test("get by cart id successfully", async () => {
                const { cartId } = await addDummyProductToCart()

                const productsInCart = await productsInCartService.getByCartId(cartId)

                expect(productsInCart).toHaveLength(1)

                expect(productsInCart[0]).toHaveProperty('name')
                expect(productsInCart[0]).toHaveProperty('quantity')
                expect(productsInCart[0]).toHaveProperty('unitPrice')
            })
        })
    })

    describe("add", () => {
        describe("success", () => {
            test("add method must be defined", () => {
                expect(productsInCartService.add).toBeDefined()
            })

            test("add same product multiple times in cart successfully", async () => {
                const productService = ProductFactory()

                const { cartId, productId } = await generateDummyProductToCart()
                const originalProductQuantity = ((await productService.getById(productId)).quantity)

                await productsInCartService.add({ cartId, productId })
                const productInCart = await productsInCartService.add({ cartId, productId })
                const prodcutQuantityAfterTwoToCartAdditions = ((await productService.getById(productId)).quantity)

                expect(productInCart).toHaveLength(1)

                expect(productInCart[0]).toHaveProperty('name')
                expect(productInCart[0]).toHaveProperty('quantity')
                expect(productInCart[0]).toHaveProperty('unitPrice')

                expect(productInCart[0].quantity).toBe(2)

                expect(prodcutQuantityAfterTwoToCartAdditions).toBe(originalProductQuantity - 2)
            })

            test("add distinct products in cart successfully", async () => {
                const { cartId, productId } = await generateDummyProductToCart()
                const dummyProduct = await addDummyProduct()
                const anotherProductId = dummyProduct.id!

                await productsInCartService.add({ cartId, productId })
                const productInCart = await productsInCartService.add({ cartId, productId: anotherProductId })

                expect(productInCart).toHaveLength(1)

                expect(productInCart[0]).toHaveProperty('name')
                expect(productInCart[0]).toHaveProperty('quantity')
                expect(productInCart[0]).toHaveProperty('unitPrice')

                expect(productInCart[0].quantity).toBe(1)
            })
        })

        describe("fail", () => {
            test("fail to add product to cart | product does not exist", async () => {
                const { cartId, productId } = await generateDummyProductToCart({ addProduct: false })

                const promise = productsInCartService.add({ cartId, productId })

                expect(promise).rejects.toThrow(new Error('Product does not exist'))
            })

            test("failt to add product to cart | product unavailable", async () => {
                const dummyUnavailableProduct = await addUnavailableDummyProduct()
                const { cartId } = await generateDummyProductToCart({ addProduct: false })

                const promise = productsInCartService.add({ cartId, productId: dummyUnavailableProduct.id! })

                expect(promise).rejects.toThrow(new Error('Product unavailable'))
            })
        })
    })

    describe("delete", () => {
        describe("success", () => {
            test("delete method must be defined", () => {
                expect(productsInCartService.delete).toBeDefined()
            })

            test("delete unique product from a cart with a single product successfully", async () => {
                const { cartId, productId } = await addDummyProductToCart()

                const deletedProduct = await productsInCartService.delete(cartId, productId)

                expect(deletedProduct).toHaveLength(0)
            })

            test("delete duplicated product from cart successfully", async () => {
                const { cartId, productId } = await addMultipleSameDummyProductsToCart(2)

                const deletedProduct = await productsInCartService.delete(cartId, productId)

                expect(deletedProduct[0]).toHaveProperty('name')
                expect(deletedProduct[0]).toHaveProperty('quantity')
                expect(deletedProduct[0]).toHaveProperty('unitPrice')

                expect(deletedProduct[0].quantity).toBe(1)
            })
        })

        describe("fail", () => {

        })
    })
})