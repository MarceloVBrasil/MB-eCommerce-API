import { IUser } from "../../../models/User"
import { UserFactory } from "../../factories/UserFactory"

async function addDummyUser() {
    const userService = UserFactory()
    const dummyUser = generateDummyUser()

    return await userService.add(dummyUser)
}

function generateDummyUser(): IUser {
    const user = {
        name: `dummy user - ${crypto.randomUUID()}`,
        email: `dummy.user.${crypto.randomUUID()}@gmail.com`,
        password: '123'
    }

    return user
}

export { generateDummyUser, addDummyUser }