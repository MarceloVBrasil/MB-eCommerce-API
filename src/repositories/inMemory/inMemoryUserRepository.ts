import { IUser } from "../../models/User"
import { IUserRepository } from "../interfaces/IUserRepository"

export class InMemoryUserRepository implements IUserRepository {
    private _users: IUser[]

    constructor() {
        this._users = [
            { id: "11c6dbf0-b2db-4520-b306-ed7f1534e49b", name: "Marcelo Bra", password: "$2a$12$jlYDJR/HUSFGAf8zZWTVQeEug.fXw.5n7crJvJX7gtSoPBcChP9wi", email: "marcelo.vital.brasil@gmail.com" },
            { id: "73ca38a2-9870-458a-8b89-bfb246e22e7d", name: "Admin", password: "$2a$12$jlYDJR/HUSFGAf8zZWTVQeEug.fXw.5n7crJvJX7gtSoPBcChP9wi", email: "marcelovitalbrasil92@gmail.com" },
            { id: "edb2ad26-9479-4aa0-908a-96acb30ed02a", name: "Hugo Vit", password: "$2a$12$jlYDJR/HUSFGAf8zZWTVQeEug.fXw.5n7crJvJX7gtSoPBcChP9wi", email: "marcelodvbrasil@icloud.com" },
        ]
    }

    async getById(id: string): Promise<IUser> {
        return this._users.find(user => user.id === id)!
    }

    async getByEmail(email: string): Promise<IUser> {
        return this._users.find(user => user.email === email)!
    }

    async add(user: IUser): Promise<IUser> {
        user.id = crypto.randomUUID()
        this._users.push(user)

        return user
    }

    async update(id: string, user: IUser): Promise<IUser> {
        const userIndex = this._users.findIndex(user => user.id === id)
        this._users[userIndex] = { ...this._users[userIndex], ...user }

        return this._users[userIndex]
    }

    async delete(id: string): Promise<string> {
        this._users = this._users.filter(user => user.id !== id)
        return id
    }
}