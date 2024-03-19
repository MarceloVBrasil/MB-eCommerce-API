import { describe, test, expect } from "@jest/globals"

import { addDummyProduct, generateProduct } from "./helpers/dummyProduct"
import { ProductFactory } from "../factories/ProductFactory"

const productService = ProductFactory()

describe("Product Service", () => {
    describe("get all", () => {
        describe("success", () => {
            test("get all method must be defined", () => {
                expect(productService.getAll).toBeDefined()
            })

            test("get all products successfully", async () => {
                await addDummyProduct()
                const products = await productService.getAll()

                expect(products.length).toBeGreaterThan(0)

                expect(products[0]).toHaveProperty('id')
                expect(products[0]).toHaveProperty('name')
                expect(products[0]).toHaveProperty('price')
                expect(products[0]).toHaveProperty('description')
                expect(products[0]).toHaveProperty('image')
                expect(products[0]).toHaveProperty('quantity')
                expect(products[0]).toHaveProperty('categoryId')
                expect(products[0]).toHaveProperty('brandId')
            })
        })
    })

    describe("get by id", () => {
        describe("success", () => {
            test("get by id method must be defined", () => {
                expect(productService.getById).toBeDefined()
            })

            test("get product by id successfully", async () => {
                const dummyProduct = await addDummyProduct()

                const product = await productService.getById(dummyProduct.id!)

                expect(product).toHaveProperty('id')
                expect(product).toHaveProperty('name')
                expect(product).toHaveProperty('price')
                expect(product).toHaveProperty('description')
                expect(product).toHaveProperty('image')
                expect(product).toHaveProperty('quantity')
                expect(product).toHaveProperty('categoryId')
                expect(product).toHaveProperty('brandId')
            })
        })
    })

    describe("get by id with brand and category", () => {
        describe("success", () => {
            test("get by id with brand and category must be defined", () => {
                expect(productService.getByIdWithBrandAndCategory).toBeDefined()
            })

            test("get product with brand and category successfully", async () => {
                const dummyProduct = await addDummyProduct()

                const productWithBrandAndCategory = await productService.getByIdWithBrandAndCategory(dummyProduct.id!)

                expect(productWithBrandAndCategory).toHaveProperty('id')
                expect(productWithBrandAndCategory).toHaveProperty('name')
                expect(productWithBrandAndCategory).toHaveProperty('price')
                expect(productWithBrandAndCategory).toHaveProperty('quantity')
                expect(productWithBrandAndCategory).toHaveProperty('image')
                expect(productWithBrandAndCategory).toHaveProperty('description')
                expect(productWithBrandAndCategory).toHaveProperty('brand')
                expect(productWithBrandAndCategory).toHaveProperty('category')
            })
        })

        describe("fail", () => {
            test("fail to get product with brand and category | invalid product id", () => {
                const productId = crypto.randomUUID()
                const promise = productService.getByIdWithBrandAndCategory(productId)

                expect(promise).rejects.toThrow(new Error("Product does not exist"))
            })
        })
    })

    describe("add", () => {
        describe("success", () => {
            test("add method must be defined", () => {
                expect(productService.add).toBeDefined()
            })

            test("add new product successfully", async () => {
                const dummyProduct = await generateProduct({ addBrand: true, addCategory: true })

                const product = await productService.add(dummyProduct)

                expect(product).toHaveProperty('id')
                expect(product).toHaveProperty('name')
                expect(product).toHaveProperty('price')
                expect(product).toHaveProperty('quantity')
                expect(product).toHaveProperty('image')
                expect(product).toHaveProperty('brandId')
                expect(product).toHaveProperty('categoryId')
            })
        })

        describe("fail", () => {
            test("fail to add new product | product already exists", async () => {
                const dummyProduct = await addDummyProduct()

                const promise = productService.add(dummyProduct)

                expect(promise).rejects.toThrow(new Error('Product already exists'))
            })

            test("fail to add new product | brand does not exist", async () => {
                const dummyProduct = await generateProduct({ addBrand: false })

                const promise = productService.add(dummyProduct)

                expect(promise).rejects.toThrow(new Error('Brand does not exist'))
            })

            test("fail to add new product | category does not exist", async () => {
                const dummyProduct = await generateProduct({ addCategory: false })

                const promise = productService.add(dummyProduct)

                expect(promise).rejects.toThrow(new Error('Category does not exist'))
            })
        })
    })

    describe("update", () => {
        describe("success", () => {
            test("update method must be defined", () => {
                expect(productService.update).toBeDefined()
            })

            test("update a product successfully", async () => {
                const dummyProduct = await addDummyProduct()
                const newProductName = `New product name - ${crypto.randomUUID()}`

                const updatedProduct = await productService.update(dummyProduct.id!, { ...dummyProduct, name: newProductName })

                expect(updatedProduct.name).toBe(newProductName)
                expect(updatedProduct.id).toBe(dummyProduct.id)
            })
        })

        describe("fail", () => {
            test("fail to update product | Product does not exist", async () => {
                const dummyProduct = await addDummyProduct()
                const productId = crypto.randomUUID()

                const promise = productService.update(productId, dummyProduct)

                expect(promise).rejects.toThrow(new Error('Product does not exist'))
            })

            test("fail to update product | Brand does not exist", async () => {
                const dummyProduct = await addDummyProduct()

                const promise = productService.update(dummyProduct.id!, { ...dummyProduct, brandId: crypto.randomUUID() })

                expect(promise).rejects.toThrow(new Error('Brand does not exist'))
            })

            test("fail to update product | Category does not exist", async () => {
                const dummyProduct = await addDummyProduct()

                const promise = productService.update(dummyProduct.id!, { ...dummyProduct, categoryId: crypto.randomUUID() })

                expect(promise).rejects.toThrow(new Error('Category does not exist'))
            })

            test("fail to update product | product already exists", async () => {
                const dummyProduct = await addDummyProduct()
                const anotherDummyProduct = await addDummyProduct()

                const promise = productService.update(dummyProduct.id!, anotherDummyProduct)

                expect(promise).rejects.toThrow(new Error('Product already exists'))
            })
        })
    })

    describe("delete", () => {
        describe("success", () => {
            test("delete must be defined", () => {
                expect(productService.delete).toBeDefined()
            })

            test("delete product successfully", async () => {
                const dummyProduct = await addDummyProduct()

                const deletedProduct = await productService.delete(dummyProduct.id!)

                expect(deletedProduct).toBe(dummyProduct.id!)
            })
        })

        describe("fail", () => {
            test("fail to delete product | product does not exist", () => {
                const productId = crypto.randomUUID()

                const promise = productService.delete(productId)

                expect(promise).rejects.toThrow(new Error('Product does not exist'))
            })
        })
    })
})