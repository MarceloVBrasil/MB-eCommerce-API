import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid"

import { UserSchema } from "./schemas/UserSchema"
import { UserFactory } from "../services/factories/UserFactory";

const userSchema = new UserSchema()

export class UserController {
    constructor() { }

    async getById(req: Request, res: Response) {
        try {
            const userService = UserFactory()

            await userSchema.getById().validate(req.params)
            const result = await userService.getById(req.params.id)
            if (!Object.keys(result).length) return res.status(400).json({ message: "user not found" })
            res.json(result)

        } catch (error: any) {
            res.status(503).json({ message: error.message })
        }
    }

    async getByEmail(req: Request, res: Response) {
        try {
            const userService = UserFactory()

            await userSchema.getByEmail().validate({ ...req.body })
            const result = await userService.getByEmail(req.body.email)
            return result
        } catch (error: any) {
            res.status(503).json({ message: error.message })
        }
    }

    async add(req: Request, res: Response) {
        try {
            const userService = UserFactory()

            await userSchema.add().validate(req.body)
            req.body.userId = uuidV4()
            req.body.addressId = uuidV4()
            const result = await userService.add(req.body)
            if (!Object.keys(result).length) return res.status(400).json({ message: "email already registered" })
            res.json(result)
        } catch (error: any) {
            res.status(503).json({ message: error.message })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const userService = UserFactory()

            await userSchema.update().validate({ ...req.params, ...req.body })
            const result = await userService.update(req.params.id, req.body)
            if (!Object.keys(result).length) return res.status(400).json({ message: "email already registered" })
            res.json(result)

        } catch (error: any) {
            res.status(503).json({ message: error.message })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const userService = UserFactory()

            await userSchema.delete().validate(req.params)
            const userResult = await userService.delete(req.params.id)
            res.json(userResult)
        } catch (error: any) {
            res.status(503).json({ message: error.message })
        }
    }
}