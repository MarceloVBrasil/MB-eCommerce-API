import { InMemoryAddressRepository } from "../../repositories/inMemory/inMemoryAddressRepository"
import { AddressService } from "../AddressService"

const { TEST_ENVIRONMENT } = process.env

let addressService: AddressService | null = null

export function AddressFactory() {
    if (!addressService && TEST_ENVIRONMENT) {
        addressService = new AddressService(new InMemoryAddressRepository())
    }

    else if (!addressService) {
        addressService = new AddressService(new InMemoryAddressRepository())
    }

    return addressService
}