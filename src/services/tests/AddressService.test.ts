import { describe, test, expect } from "@jest/globals"

import { generateDummyAddress, addDummyAddress } from "./helpers/dummyAddress"
import { AddressFactory } from "../factories/AddressFactory"
import { canadianProvinces } from "../../models/Address"

const addressService = AddressFactory()

describe("Address Service", () => {
    describe("get by user id", () => {
        test("get by user id method must be defined", () => {
            expect(addressService.getByUserId).toBeDefined()
        })

        describe("success", () => {
            test("get by user id successfully", async () => {
                const dummyAddress = await addDummyAddress()

                const address = await addressService.getByUserId(dummyAddress.userId)

                expect(address).toHaveProperty('id')
                expect(address).toHaveProperty('province')
                expect(address).toHaveProperty('city')
                expect(address).toHaveProperty('street')
                expect(address).toHaveProperty('postalCode')
                expect(address).toHaveProperty('complement')
            })
        })
    })

    describe("add", () => {
        describe("success", () => {
            test("add method must be defined", () => {
                expect(addressService.add).toBeDefined()
            })

            test("add an address successfully", async () => {
                const address = await generateDummyAddress({ addUser: true })

                const newAddress = await addressService.add(address)

                expect(newAddress).toHaveProperty('id')
                expect(newAddress).toHaveProperty('complement')
                expect(newAddress).toHaveProperty('postalCode')
                expect(newAddress).toHaveProperty('street')
                expect(newAddress).toHaveProperty('city')
                expect(newAddress).toHaveProperty('province')
            })
        })

        describe("fail", () => {
            test("fail to add new address | user does not exist", async () => {
                const address = await generateDummyAddress({ addUser: false })

                const promise = addressService.add(address)

                expect(promise).rejects.toThrow(new Error('User does not exist'))
            })

            test("fail to add new address | invalid province", async () => {
                const address = await generateDummyAddress({ province: 'invalid province' as canadianProvinces })

                const promise = addressService.add(address)

                expect(promise).rejects.toThrow(new Error('Invalid province'))
            })

            test("fail to add new address | address associated with this user already exists", async () => {

                const dummyAddress = await addDummyAddress()

                const promise = addressService.add(dummyAddress)

                expect(promise).rejects.toThrow(new Error('Address associated with this user already exists'))
            })
        })
    })

    describe("update", () => {
        describe("success", () => {
            test("update method must be defined", () => {
                expect(addressService.update).toBeDefined()
            })

            test("update an address successfully", async () => {
                const dummyAddress = await addDummyAddress()
                const newProvince: canadianProvinces = 'MB'

                const updatedAddress = await addressService.update(dummyAddress.userId, { ...dummyAddress, province: newProvince })

                expect(updatedAddress.province).toBe(newProvince)
            })
        })

        describe("fail", () => {
            test("fail to update an address | user does not exist", async () => {
                const address = await generateDummyAddress({ addUser: false })

                const promise = addressService.update(address.userId, address)

                expect(promise).rejects.toThrow(new Error('User does not exist'))
            })

            test("fail to update an address | invalid province", async () => {
                const address = await generateDummyAddress({ province: 'invalid province' as canadianProvinces })

                const promise = addressService.update(address.userId, address)

                expect(promise).rejects.toThrow(new Error('Invalid province'))
            })

            test("fail to update an address | cannot update someone else's address", async () => {
                const dummyAddress = await addDummyAddress()
                const anotherDummyAddress = await addDummyAddress()

                const promise = addressService.update(dummyAddress.userId, anotherDummyAddress)

                expect(promise).rejects.toThrow(new Error("Cannot update someone else's address"))
            })
        })
    })

    describe("delete", () => {
        describe("success", () => {
            test("delete method must be defined", () => {
                expect(addressService.delete).toBeDefined()
            })

            test("delete an address successfully", async () => {
                const dummyAddress = await addDummyAddress()

                const deletedUserId = await addressService.delete(dummyAddress.userId)

                expect(deletedUserId).toBe(dummyAddress.userId)
            })
        })

        describe("fail", () => {
            test("fail to delete address | user does not exist", () => {
                const userId = crypto.randomUUID()

                const promise = addressService.delete(userId)

                expect(promise).rejects.toThrow(new Error('User does not exist'))
            })
        })
    })
})