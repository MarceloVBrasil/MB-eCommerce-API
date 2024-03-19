import { describe, test, expect } from "@jest/globals"

import { addDummyUser, generateDummyUser } from "./helpers/dummyUser"
import { UserFactory } from "../factories/UserFactory"

const userService = UserFactory()

describe("User Service", () => {
    describe("get by id", () => {
        describe("success", () => {
            test("get by id method must be defined", () => {
                expect(userService.getById).toBeDefined()
            })

            test("get by id successfully", async () => {
                const dummyUser = await addDummyUser()

                const user = await userService.getById(dummyUser.id!)
                expect(user).toHaveProperty('id')
                expect(user).toHaveProperty('name')
                expect(user).toHaveProperty('email')
                expect(user).toHaveProperty('password')
            })
        })
    })

    describe("get by email", () => {
        describe("success", () => {
            test("get by email method must be defined", () => {
                expect(userService.getByEmail).toBeDefined()
            })

            test("get by email successfully", async () => {
                const dummyUser = await addDummyUser()

                const user = await userService.getByEmail(dummyUser.email)

                expect(user).toHaveProperty('id')
                expect(user).toHaveProperty('name')
                expect(user).toHaveProperty('email')
                expect(user).toHaveProperty('password')
            })
        })
    })

    describe("add", () => {
        describe("success", () => {
            test("add a new user successfully", async () => {
                const dummyUser = await addDummyUser()

                expect(dummyUser).toHaveProperty('id')
                expect(dummyUser).toHaveProperty('name')
                expect(dummyUser).toHaveProperty('email')
                expect(dummyUser).toHaveProperty('password')
            })
        })

        describe("failure", () => {
            test("fail to add new user | email already exists", async () => {
                const dummyUser = await addDummyUser()
                const promise = userService.add(dummyUser)

                expect(promise).rejects.toThrow(new Error('Email already exists'))
            })
        })
    })

    describe("update", () => {
        describe("success", () => {
            test("update method must be defined", () => {
                expect(userService.update).toBeDefined()
            })

            test("update user successfully", async () => {
                const dummyUser = await addDummyUser()
                const anotherUser = generateDummyUser()

                const response = await userService.update(dummyUser.id!, anotherUser)
                expect(response.email).toBe(anotherUser.email)
            })
        })
    })

    describe("failure", () => {
        test("fail to update user | user does not exist", () => {
            const dummyUser = generateDummyUser()

            const promise = userService.update(crypto.randomUUID(), dummyUser)
            expect(promise).rejects.toThrow(new Error('User does not exist'))
        })

        test("fail to update user | email already exist", async () => {
            const dummyUser = await addDummyUser()
            const anotherDummyUser = await addDummyUser()

            const promise = userService.update(dummyUser.id!, anotherDummyUser)
            expect(promise).rejects.toThrow(new Error('Email already exist'))
        })
    })
})

describe("delete", () => {
    describe("success", () => {
        test("delete user successfully", async () => {
            const dummyUser = await addDummyUser()

            const deletedUser = await userService.delete(dummyUser.id!)

            expect(deletedUser).toBe(dummyUser.id)

        })
    })

    describe("failure", () => {
        test("fail to delete user | user does not exist", () => {
            const userId = crypto.randomUUID()

            const promise = userService.delete(userId)

            expect(promise).rejects.toThrow(new Error('User does not exist'))
        })
    })
})
