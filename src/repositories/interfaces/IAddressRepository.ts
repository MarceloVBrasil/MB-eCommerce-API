import { IAddress } from "../../models/Address"

export interface IAddressRepository {
    getByUserId(userId: string): Promise<IAddress>
    add(address: IAddress): Promise<IAddress>
    update(userId: string, address: IAddress): Promise<IAddress>
    delete(userId: string): Promise<string>
}