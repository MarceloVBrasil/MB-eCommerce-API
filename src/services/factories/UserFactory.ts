import { InMemoryUserRepository } from "../../repositories/inMemory/inMemoryUserRepository";
import { UserService } from "../UserService";

const { TEST_ENVIRONMENT } = process.env

let userService: UserService | null = null

export function UserFactory() {
    if (!userService && TEST_ENVIRONMENT) {
        userService = new UserService(new InMemoryUserRepository())
    }

    else if (!userService) {
        userService = new UserService(new InMemoryUserRepository())
    }

    return userService
}