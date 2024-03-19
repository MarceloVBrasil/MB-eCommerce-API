import { ICart } from "../../../models/Cart"
import { CartFactory } from "../../factories/CartFactory"
import { addDummyAddress } from "./dummyAddress"
import { addDummyUser } from "./dummyUser"

interface IGenerateDummyCart {
    addUser?: boolean
}

const cartService = CartFactory()

async function addDummyCart() {
    const dummyAddress = await addDummyAddress()
    return await cartService.openByUserId(dummyAddress.userId)
}

async function generateDummyCart({ addUser = true }: IGenerateDummyCart): Promise<ICart> {
    const userId = await getUserId(addUser)
    return { userId: userId, status: 'open' }
}

async function getUserId(addUser: boolean): Promise<string> {
    if (!addUser) return 'user id'

    const dummyUser = await addDummyUser()
    return dummyUser.id!
}

export { addDummyCart, generateDummyCart }