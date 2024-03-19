import { AddressFactory } from "../../factories/AddressFactory"
import { IAddress, canadianProvinces } from "../../../models/Address"
import { addDummyUser } from "./dummyUser"

interface IGenerateDummyAddress {
    addUser?: boolean
    province?: canadianProvinces
}

async function addDummyAddress() {
    const addressService = AddressFactory()

    const address = await generateDummyAddress({ addUser: true })

    return await addressService.add(address)
}

async function generateDummyAddress({ addUser = true, province }: IGenerateDummyAddress): Promise<IAddress> {
    const userId = await getUserId(addUser as boolean)

    return {
        userId: userId || 'userId',
        province: province as canadianProvinces || 'ON',
        city: 'Toronto',
        street: '123 st',
        postalCode: 'L4A 8T9',
        complement: 'unit 309'
    }
}

async function getUserId(addUser: boolean): Promise<string> {
    if (!addUser) return 'user Id'

    const dummyUser = await addDummyUser()
    return dummyUser.id!
}

export { generateDummyAddress, addDummyAddress }