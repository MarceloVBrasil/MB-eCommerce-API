import { IUser } from "../../models/User"

export interface IUserRepository {
    getById(id: string): Promise<IUser>
    getByEmail(email: string): Promise<IUser>
    add(data: IUser): Promise<IUser>
    update(id: string, data: IUser): Promise<IUser>
    delete(id: string): Promise<string>
}