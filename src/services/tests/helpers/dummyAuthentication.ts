import { AuthFactory } from "../../factories/AuthFactory"
import { generateDummyAddress } from "./dummyAddress"
import { generateDummyUser } from "./dummyUser"

const authService = AuthFactory()

async function registerDummyUser({ password }: { password?: string } = {}) {
    const dummyUser = generateDummyUser()
    if (password) dummyUser.password = password

    const dummyAddress = await generateDummyAddress({ addUser: true })

    return await authService.register({ user: dummyUser, address: dummyAddress })
}

export { registerDummyUser }