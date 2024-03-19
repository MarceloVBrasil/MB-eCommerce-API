import { describe, expect, test } from "@jest/globals"

import { addDummyCategory } from "./helpers/dummyCategory"
import { CategoryFactory } from "../factories/CategoryFactory"

const categoryService = CategoryFactory()

describe("Category Service", () => {
    describe("get by name", () => {
        describe("success", () => {
            test("get by name mathod must be defined", () => {
                expect(categoryService.getByName).toBeDefined()
            })

            test("get by name successfully", async () => {
                const name = "Games"

                const category = await categoryService.getByName(name)

                expect(category).toHaveProperty('id')
                expect(category).toHaveProperty('name')
            })
        })
    })

    describe("get by id", () => {
        describe("success", () => {
            test("get by id method must be defined", () => {
                expect(categoryService.getById).toBeDefined()
            })

            test("get by id successfully", async () => {
                const id = "9d0b0267-a6c4-4411-aec7-551d1bb237ba"

                const category = await categoryService.getById(id)

                expect(category).toHaveProperty('id')
                expect(category).toHaveProperty('name')
            })
        })
    })

    describe("add", () => {
        describe("success", () => {
            test("add method must be defined", () => {
                expect(categoryService.add).toBeDefined()
            })

            test("add new category successfully", async () => {
                const dummyCategory = await addDummyCategory()

                expect(dummyCategory).toHaveProperty('id')
                expect(dummyCategory).toHaveProperty('name')
            })
        })

        describe("failure", () => {
            test("fail to add category | category already exists", async () => {
                const dummyCategory = await addDummyCategory()

                const promise = categoryService.add(dummyCategory)

                expect(promise).rejects.toThrow(new Error('Category already exists'))
            })
        })
    })

    describe("update", () => {
        describe("success", () => {
            test("update method must be defined", () => {
                expect(categoryService.update).toBeDefined()
            })

            test("update category successfully", async () => {
                const dummyCategory = await addDummyCategory()
                const newCategoryName = `New Category Name - ${crypto.randomUUID()}`

                const response = await categoryService.update(dummyCategory.id!, { name: newCategoryName })

                expect(response.name).toBe(newCategoryName)
            })
        })

        describe("failure", () => {
            test("fail to update category | Category already exists", async () => {
                const dummyCategory = await addDummyCategory()
                const anotherDummyCategory = await addDummyCategory()

                const promise = categoryService.update(dummyCategory.id!, anotherDummyCategory)

                expect(promise).rejects.toThrow(new Error('Category already exists'))
            })
        })
    })

    describe("delete", () => {
        describe("success", () => {
            test("delete method must be defined", () => {
                expect(categoryService.delete).toBeDefined()
            })

            test("delete category successfully", async () => {
                const dummyCategory = await addDummyCategory()

                const deletedCategoryId = await categoryService.delete(dummyCategory.id!)

                expect(deletedCategoryId).toBe(dummyCategory.id)
            })
        })

        describe("failure", () => {
            test("fail to delete category | category not found", () => {
                const categoryId = crypto.randomUUID()

                const promise = categoryService.delete(categoryId)

                expect(promise).rejects.toThrow(new Error('Category does not exist'))
            })
        })
    })
})