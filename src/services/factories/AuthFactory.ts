import { AuthenticationService } from "../AuthenticationService"

const { TEST_ENVIRONMENT } = process.env

let authenticationService: AuthenticationService | null = null


export function AuthFactory() {
    if (!authenticationService && TEST_ENVIRONMENT) {
        authenticationService = new AuthenticationService()
    }

    else if (!authenticationService) {
        authenticationService = new AuthenticationService()
    }

    return authenticationService
}