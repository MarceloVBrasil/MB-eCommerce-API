import { describe, expect, test } from "@jest/globals"

import { addDummyBrand } from "./helpers/dummyBrand"
import { BrandFactory } from "../factories/BrandFactory"

const brandService = BrandFactory()

describe("Brand Service", () => {
    describe("get by name", () => {
        describe("success", () => {
            test("get by name mathod must be defined", () => {
                expect(brandService.getByName).toBeDefined()
            })

            test("get by name successfully", async () => {
                const dummyBrand = await addDummyBrand()

                const brand = await brandService.getByName(dummyBrand.name)

                expect(brand).toHaveProperty('id')
                expect(brand).toHaveProperty('name')
            })
        })
    })

    describe("get by id", () => {
        describe("success", () => {
            test("get by id method must be defined", () => {
                expect(brandService.getById).toBeDefined()
            })

            test("get by id successfully", async () => {
                const dummyBrand = await addDummyBrand()

                const brand = await brandService.getById(dummyBrand.id!)

                expect(brand).toHaveProperty('id')
                expect(brand).toHaveProperty('name')
            })
        })
    })

    describe("add", () => {
        describe("success", () => {
            test("add method must be defined", () => {
                expect(brandService.add).toBeDefined()
            })

            test("add new brand successfully", async () => {
                const dummyBrand = await addDummyBrand()

                expect(dummyBrand).toHaveProperty('id')
                expect(dummyBrand).toHaveProperty('name')
            })
        })

        describe("failure", () => {
            test("fail to add brand | brand already exists", async () => {
                const dummyBrand = await addDummyBrand()

                const promise = brandService.add(dummyBrand)

                expect(promise).rejects.toThrow(new Error('Brand already exists'))
            })
        })
    })

    describe("update", () => {
        describe("success", () => {
            test("update method must be defined", () => {
                expect(brandService.update).toBeDefined()
            })

            test("update brand successfully", async () => {
                const dummyBrand = await addDummyBrand()
                const newBrandName = `New Brand Name ${crypto.randomUUID()}`

                const response = await brandService.update(dummyBrand.id!, { name: newBrandName })

                expect(response.name).toBe(newBrandName)
            })
        })

        describe("failure", () => {
            test("fail to update brand | Brand already exists", async () => {
                const dummyBrand = await addDummyBrand()
                const anotherDummyBrand = await addDummyBrand()

                const promise = brandService.update(anotherDummyBrand.id!, dummyBrand)

                expect(promise).rejects.toThrow(new Error('Brand already exists'))
            })
        })
    })

    describe("delete", () => {
        describe("success", () => {
            test("delete method must be defined", () => {
                expect(brandService.delete).toBeDefined()
            })

            test("delete brand successfully", async () => {
                const dummyBrand = await addDummyBrand()

                const deletedBrandId = await brandService.delete(dummyBrand.id!)

                expect(deletedBrandId).toBe(dummyBrand.id)
            })
        })

        describe("failure", () => {
            test("fail to delete brand | brand not found", () => {
                const brandId = crypto.randomUUID()

                const promise = brandService.delete(brandId)

                expect(promise).rejects.toThrow(new Error('Brand does not exist'))
            })
        })
    })
})